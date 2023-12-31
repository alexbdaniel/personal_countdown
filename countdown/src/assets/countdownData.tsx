

export const countdownData = [
  {
    id: '1',
    urlName: 'japan',
    displayNameShort: 'Japan',
    displayName: 'Time remaining until Japan',
    target: '2023-01-16T23:00:00.000Z'
  },
  {
    id: '2',
    urlName: 'busselton',
    displayNameShort: 'Busselton',
    displayName: 'Time remaining until Busselton',
    target: '2023-12-26T23:00:00.000Z'
  }
]

export interface ICountdown {
  id: string,
  urlName: string,
  displayNameShort: string
  displayName: string,
  target: string
}