const makeVCardVersion = () => `VERSION:3.0`
const makeVCardName = (name) => `FN:${name}`
const makeVCardOrg = (org) => `ORG:${org}`
const makeVCardTitle = (title) => `TITLE:${title}`
const makeVCardTel = (phone) => `TEL;TYPE=WORK,VOICE:${phone}`
const makeVCardEmail = (email) => `EMAIL:${email}`
const makeVCardTimeStamp = () => `REV:${new Date().toISOString()}`

// ref: https://dev.to/walternascimentobarroso/make-vcard-with-js-2afl
export const genVcard = (values) => {
  const vcard = `BEGIN:VCARD
    ${makeVCardVersion()}
    ${makeVCardName(values.name)}
    ${makeVCardOrg(values.company)}
    ${makeVCardTitle(values.title)}
    ${makeVCardTel(values.phone)}
    ${makeVCardEmail(values.email)}
    ${makeVCardTimeStamp()}
    END:VCARD`
  return vcard
}
