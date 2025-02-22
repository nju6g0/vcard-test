import { useState } from 'react'
import {
  Layout,
  Input,
  Checkbox,
  Col,
  Row,
  Typography,
  Button,
  Upload,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'

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
  PHOTO: 'photo',
}
function Vcard() {
  const [formValue, setFormValue] = useState({
    [FORM_FIELD.COMPANY]: { text: '', checked: false },
    [FORM_FIELD.FIRSTNAME]: { text: '', checked: false },
    [FORM_FIELD.LASTNAME]: { text: '', checked: false },
    [FORM_FIELD.TITLE]: { text: '', checked: false },
    [FORM_FIELD.PHONE]: { text: '', checked: false },
    [FORM_FIELD.EMAIL]: { text: '', checked: false },
    [FORM_FIELD.PHOTO]: { file: null, checked: false },
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
  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormValue((prev) => ({
          ...prev,
          [FORM_FIELD.PHOTO]: { file: e.target.result, checked: true },
        }))
      }
      reader.readAsDataURL(info.file.originFileObj)
    }
  }
  const downloadToFile = (content, filename, contentType) => {
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
                {FORM_FIELD[item] === FORM_FIELD.PHOTO ? (
                  <>
                    <Upload
                      name="photo"
                      listType="picture"
                      showUploadList={false}
                      onChange={handleFileChange}
                    >
                      <Button icon={<UploadOutlined />}>Upload Photo</Button>
                    </Upload>
                    {formValue[FORM_FIELD.PHOTO].file && (
                      <img
                        src={formValue[FORM_FIELD.PHOTO].file}
                        alt="Preview"
                        style={{ marginTop: '10px', width: '100px' }}
                      />
                    )}
                  </>
                ) : (
                  <Input
                    placeholder={FORM_FIELD[item]}
                    value={formValue[FORM_FIELD[item]].text}
                    type={getInputType(FORM_FIELD[item])}
                    onChange={(e) => {
                      handleTextChange(FORM_FIELD[item], e.target.value)
                    }}
                  />
                )}
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
