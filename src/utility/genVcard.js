import VCard from 'vcard-creator'

function genVcardFromCreator(values) {
  // Define a new vCard
  const myVCard = new VCard()

  // Some variables
  const lastname = 'Desloovere'
  const firstname = 'Jeroen'
  const additional = ''
  const prefix = ''
  const suffix = ''

  myVCard
    // Add personal data
    .addName(lastname, firstname, additional, prefix, suffix)
    // Add work data
    .addCompany('Siesqo')
    .addJobtitle('Web Developer')
    .addRole('Data Protection Officer')
    .addEmail('info@jeroendesloovere.be')
    .addPhoneNumber(1234121212, 'PREF;WORK')
    .addPhoneNumber(123456789, 'WORK')
    .addAddress(
      null,
      null,
      'street',
      'worktown',
      null,
      'workpostcode',
      'Belgium'
    )
    .addSocial('https://twitter.com/desloovere_j', 'Twitter', 'desloovere_j')
    .addURL('http://www.jeroendesloovere.be')

  console.log(myVCard.toString())
  return myVCard
}

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
const genVcard = (values) => {
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

export { genVcardFromCreator, genVcard }
