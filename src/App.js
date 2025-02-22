import { useState } from 'react'
import { Layout, Input, Checkbox, Col, Row, Typography, Button } from 'antd'
import './App.css'

const { Text } = Typography

const FORM_FIELD = {
  COMPANY: 'company',
  NAME: 'name',
  TITLE: 'title',
  PHONE: 'phone',
  EMAIL: 'email',
}
function App() {
  const [formValue, setFormValue] = useState({
    [FORM_FIELD.COMPANY]: { text: '', checked: false },
    [FORM_FIELD.NAME]: { text: '', checked: false },
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
  const handleDownload = () => {
    console.log(formValue)
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

export default App
