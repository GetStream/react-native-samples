const { getDefaultConfig } = require('metro-config');

/* eslint-env node */
function resolvePath(...parts) {
  const thisPath = PATH.resolve.apply(PATH, parts);
  if (!FS.existsSync(thisPath)) {
    return;
  }

  return FS.realpathSync(thisPath);
}

function isExternalModule(modulePath) {
  return modulePath.substring(0, __dirname.length) !== __dirname;
}

function listDirectories(rootPath, cb) {
  FS.readdirSync(rootPath).forEach((fileName) => {
    if (fileName.charAt(0) === '.') {
      return;
    }

    let fullFileName = PATH.join(rootPath, fileName),
      stats = FS.lstatSync(fullFileName),
      symbolic = false;

    if (stats.isSymbolicLink()) {
      fullFileName = resolvePath(fullFileName);
      if (!fullFileName) {
        return;
      }

      stats = FS.lstatSync(fullFileName);

      symbolic = true;
    }

    if (!stats.isDirectory()) {
      return;
    }

    const external = isExternalModule(fullFileName);
    cb({ external, fileName, fullFileName, rootPath, symbolic });
  });
}

function buildFullModuleMap(
  moduleRoot,
  mainModuleMap,
  externalModuleMap,
  _alreadyVisited,
  _prefix,
) {
  if (!moduleRoot) {
    return;
  }

  const alreadyVisited = _alreadyVisited || {},
    prefix = _prefix;

  if (alreadyVisited && alreadyVisited.hasOwnProperty(moduleRoot)) {
    return;
  }

  alreadyVisited[moduleRoot] = true;

  listDirectories(
    moduleRoot,
    ({ external, fileName, fullFileName, symbolic }) => {
      if (symbolic) {
        return buildFullModuleMap(
          resolvePath(fullFileName, 'node_modules'),
          mainModuleMap,
          externalModuleMap,
          alreadyVisited,
        );
      }

      const moduleMap = external ? externalModuleMap : mainModuleMap,
        moduleName = prefix ? PATH.join(prefix, fileName) : fileName;

      if (fileName.charAt(0) !== '@') {
        moduleMap[moduleName] = fullFileName;
      } else {
        return buildFullModuleMap(
          fullFileName,
          mainModuleMap,
          externalModuleMap,
          alreadyVisited,
          fileName,
        );
      }
    },
  );
}

function buildModuleResolutionMap() {
  const moduleMap = {},
    externalModuleMap = {};

  buildFullModuleMap(baseModulePath, moduleMap, externalModuleMap);

  // Root project modules take precedence over external modules
  return Object.assign({}, externalModuleMap, moduleMap);
}

function findAlernateRoots(
  moduleRoot = baseModulePath,
  alternateRoots = [],
  _alreadyVisited,
) {
  const alreadyVisited = _alreadyVisited || {};
  if (alreadyVisited && alreadyVisited.hasOwnProperty(moduleRoot)) {
    return;
  }

  alreadyVisited[moduleRoot] = true;

  listDirectories(moduleRoot, ({ external, fileName, fullFileName }) => {
    if (fileName.charAt(0) !== '@') {
      if (external) {
        alternateRoots.push(fullFileName);
      }
    } else {
      findAlernateRoots(fullFileName, alternateRoots, alreadyVisited);
    }
  });

  return alternateRoots;
}

function getPolyfillHelper() {
  let getPolyfills;

  // Get default react-native polyfills
  try {
    getPolyfills = require('react-native/rn-get-polyfills');
  } catch (e) {
    getPolyfills = () => [];
  }

  // See if project has custom polyfills, if so, include the PATH to them
  try {
    const customPolyfills = require.resolve('./polyfills.js');
    getPolyfills = (function (originalGetPolyfills) {
      return () => originalGetPolyfills().concat(customPolyfills);
    })(getPolyfills);
  } catch (e) {
    //ignore
  }

  return getPolyfills;
}

const PATH = require('path');
const FS = require('fs'),
  blacklist = require('metro-config/src/defaults/blacklist');

const repoDir = PATH.dirname(PATH.dirname(PATH.dirname(__dirname)));

const moduleBlacklist = [
    new RegExp(repoDir + '/stream-chat-react-native/examples/.*'),
    new RegExp(repoDir + '/stream-chat-react-native/examples/ExpoMessaging/.*'),
    //   new RegExp(repoDir + '/native-example/(.*)'),
    new RegExp(
      repoDir + '/stream-chat-react-native/native-package/node_modules/.*',
    ),
    new RegExp(repoDir + '/stream-chat-react-native/expo-package/.*'),
    new RegExp(repoDir + '/stream-chat-react-native/node_modules/.*'),
    new RegExp(repoDir + '/@flat-list-mvcp/node_modules/.*'),
  ],
  baseModulePath = resolvePath(__dirname, 'node_modules'),
  // watch alternate roots (outside of project root)
  alternateRoots = findAlernateRoots(),
  // build full module map for proper
  // resolution of modules in external roots
  extraNodeModules = buildModuleResolutionMap();

if (alternateRoots && alternateRoots.length) {
  console.log('Found alternate project roots: ', alternateRoots);
}

module.exports = (async () => {
  const {
    resolver: { assetExts, sourceExts },
  } = await getDefaultConfig();
  return {
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      blacklistRE: blacklist(moduleBlacklist),
      extraNodeModules,
      sourceExts: [...sourceExts, 'svg'],
      useWatchman: false,
    },
    // transformer: {
    //   babelTransformerPath: require.resolve('./compiler/transformer'),
    // },
    serializer: {
      getPolyfills: getPolyfillHelper(),
    },

    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    watchFolders: [PATH.resolve(__dirname)].concat(alternateRoots),
  };
})();
