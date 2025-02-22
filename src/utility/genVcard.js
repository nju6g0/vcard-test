const makeVCardVersion = () => `VERSION:3.0`
const makeVCardInfo = (info) => `N:${info}`
const makeVCardName = (name) => `FN:${name}`
const makeVCardOrg = (org) => `ORG:${org}`
const makeVCardTitle = (title) => `TITLE:${title}`
const makeVCardPhoto = (img) => `PHOTO;TYPE=JPEG;ENCODING=b:[${img}]`
const makeVCardTel = (phone) => `TEL;TYPE=WORK,VOICE:${phone}`
const makeVCardAdr = (address) => `ADR;TYPE=WORK,PREF:;;${address}`
const makeVCardEmail = (email) => `EMAIL:${email}`
const makeVCardTimeStamp = () => `REV:${new Date().toISOString()}`

// ref: https://dev.to/walternascimentobarroso/make-vcard-with-js-2afl
export const genVcard = (values) => {
  const vcard = `BEGIN:VCARD
    ${makeVCardVersion()}
    ${makeVCardInfo('cardInfo')}
    ${makeVCardName(values.name)}
    ${makeVCardOrg(values.company)}
    ${makeVCardTitle(values.title)}
    ${makeVCardPhoto('https://unsplash.com/photos/an-elephant-is-walking-down-a-dirt-road-I6Qh6UAYazg')}
    ${makeVCardTel(values.phone)}
    ${makeVCardAdr('addressEl')}
    ${makeVCardEmail(values.email)}
    ${makeVCardTimeStamp()}
    END:VCARD`
  return vcard
}
