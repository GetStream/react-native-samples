import {UserWithToken} from '../common/types';

// typically tokens are generated on the server side,
// however for the sake of this example we are hardcoding them
export const usersWithToken: UserWithToken[] = [
  {
    id: 'ivan',
    name: 'Ivan Sekovanikj',
    image: 'https://ca.slack-edge.com/T02RM6X6B-U07GZ78U6BC-9ab8d6408182-512',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaXZhbiJ9.JKZTKXQUd6FUgvm4IEKikPnT8J5OA-g18M-3_BEgyhM',
  },
  {
    id: 'khushal',
    name: 'Khushal Agarwal',
    image: 'https://ca.slack-edge.com/T02RM6X6B-U02DTREQ2KX-5d600c87d3bc-512',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia2h1c2hhbCJ9.7po5E4ycgT-MDDedYxUxc_KbqeFu3XjIPKvII1HMjxg',
  },
  {
    id: 'oliver',
    name: 'Oliver Lazoroski',
    image: 'https://ca.slack-edge.com/T02RM6X6B-U03HJKTMSQZ-cdf636547793-512',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2xpdmVyIn0.btRmM9UmZndrOpVq0MvS4nUK6nTiZzSE1TlLYo9lHII',
  },
  {
    id: 'santhosh',
    name: 'Santhosh Vaiyapuri',
    image: 'https://ca.slack-edge.com/T02RM6X6B-U0359AX2TUY-dc7dbec0bb88-512',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2FudGhvc2gifQ.fAFqUimsbFl2ibmsZ1afv0i4TLs8XQWIGRhnypv81Ts',
  },
];
