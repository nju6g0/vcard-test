import { useState } from 'react'
import { Layout, Input, Checkbox, Col, Row, Typography, Button } from 'antd'

import '../../App.css'

import { genVcardFromCreator } from '../../utility/genVcard'

const { Text } = Typography

const FORM_FIELD = {
  COMPANY: 'company',
  FIRSTNAME: 'firstname',
  LASTNAME: 'lastname',
  TITLE: 'title',
  PHONE: 'phone',
  EMAIL: 'email',
}
function Vcard() {
  const [formValue, setFormValue] = useState({
    [FORM_FIELD.COMPANY]: { text: '', checked: false },
    [FORM_FIELD.FIRSTNAME]: { text: '', checked: false },
    [FORM_FIELD.LASTNAME]: { text: '', checked: false },
    [FORM_FIELD.TITLE]: { text: '', checked: false },
    [FORM_FIELD.PHONE]: { text: '', checked: false },
    [FORM_FIELD.EMAIL]: { text: '', checked: false },
  })
  const getInputType = (key) => {
    switch (key) {
      case FORM_FIELD.EMAIL:
        return 'email'
      case FORM_FIELD.PHONE:
        return 'number'
      default:
        return 'text'
    }
  }
  const handleTextChange = (key, value) => {
    setFormValue((prev) => ({ ...prev, [key]: { ...prev[key], text: value } }))
  }
  const handleCheckChange = (key, value) => {
    setFormValue((prev) => ({
      ...prev,
      [key]: { ...prev[key], checked: value },
    }))
  }
  const downloadToFile = (content, filename, contentType) => {
    console.log(content)
    const file = new Blob([content], { type: contentType })
    const url = window.URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.setAttribute('download', filename)
    document.body.appendChild(a)

    window.setTimeout(() => {
      a.click()
      // a.parentNode.removeChild(a)
      document.body.removeChild(a)
      URL.revokeObjectURL(url) // 確保釋放資源
    }, 100)
  }
  const handleDownload = (e) => {
    e.preventDefault()

    let vcardValues = {}
    Object.keys(formValue).forEach((key) => {
      console.log(key, formValue[key])
      if (formValue[key].checked) {
        vcardValues[key] = formValue[key].text
      }
    })
    // const vcard = genVcard(vcardValues)
    const vcard = genVcardFromCreator(vcardValues)
    downloadToFile(
      vcard,
      `${formValue[FORM_FIELD.FIRSTNAME].text}Vcard.vcf`,
      'text/vcard'
    )
  }
  return (
    <div className="App">
      <main>
        <Layout className="form">
          {Object.keys(FORM_FIELD).map((item) => (
            <Row
              className="row"
              key={FORM_FIELD[item]}
              justify="space-between"
              align="middle"
            >
              <Col className="label" span={24}>
                <Text type="secondary">{FORM_FIELD[item]}:</Text>
              </Col>
              <Col span={24}>
                <Input
                  placeholder={FORM_FIELD[item]}
                  value={formValue[FORM_FIELD[item]].text}
                  type={getInputType(FORM_FIELD[item])}
                  onChange={(e) => {
                    handleTextChange(FORM_FIELD[item], e.target.value)
                  }}
                />
              </Col>
              <Col span={24}>
                <Checkbox
                  checked={formValue[FORM_FIELD[item]].checked}
                  onChange={(e) => {
                    handleCheckChange(FORM_FIELD[item], e.target.checked)
                  }}
                >
                  available for download
                </Checkbox>
              </Col>
            </Row>
          ))}
          <Button onClick={handleDownload}>Download</Button>
        </Layout>
      </main>
    </div>
  )
}

export default Vcard
