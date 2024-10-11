import { ModelConfig } from "@antv/g6";
import {
  Form,
  Input,
  Button,
  Radio,
  Row,
  Col,
  Modal,
  Select,
  Flex,
  Image,
} from "antd";
import { SetStateAction, useEffect, useState } from "react";

interface UserFormProps {
  firstName: string;
  lastName: string;
  gender: string | null;
  email: string;
  phone: string;
  aliveStatus: "Dead" | "Alive";
  placeOfBirth: string;
  placeOfDeath?: string;
}

interface IUseForm {
  setCreateId: React.Dispatch<SetStateAction<undefined | ModelConfig>>;
  createId?: ModelConfig;
  setOpenMap: React.Dispatch<SetStateAction<boolean>>;
  openMap: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const UserForm: React.FC<IUseForm> = ({
  setCreateId,
  createId,
  setOpen,
}) => {
  const [formData, setFormData] = useState<UserFormProps>({
    firstName: "",
    lastName: "",
    gender: typeof createId === "string" ? createId : null,
    email: "",
    phone: "",
    aliveStatus: "Alive",
    placeOfBirth: "",
    placeOfDeath: "",
  });
  const [location, setLocation] = useState<{
    state: string;
    city: string;
    birthOrDeath: string;
    state2: string;
    city2: string;
  }>({ state: "", city: "", birthOrDeath: "", state2: "", city2: "" });
  const [form] = Form.useForm();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "հունվար",
    "փետրվար",
    "մարտ",
    "ապրիլ",
    "մայիս",
    "հունիս",
    "հուլիս",
    "օգոստոս",
    "սեպտեմբեր",
    "հոկտեմբեր",
    "նոյեմբեր",
    "դեկտեմբեր",
  ];

  const handleSubmit = () => {
    console.log("Submitted data:", formData);
  };

  const handleChange = (key: keyof UserFormProps, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    console.log("useEffect");
    if (location.state || location.city || location.state2 || location.city2) {
      if (location.birthOrDeath) {
        form.setFieldValue(
          "placeOfDeath",
          location.state2 + " " + location.city2
        );
      } else {
        form.setFieldValue(
          "PlaceOfBirth",
          location.state + " " + location.city
        );
      }
    }
  }, [form, location]);

  return (
    <>
      <Modal
        open={!!createId?.text || !!createId?.edit}
        onCancel={() => {
          form.resetFields();
          setCreateId(undefined);
        }}
        width={"55%"}
        style={{ minWidth: '450px' }}
        footer={null}>
        <Flex gap={20}>
          <Flex
            onClick={() => {
              setOpen(true);
            }}
            justify="center"
            align="center"
            style={{
              minWidth: "65px",
              height: "65px",
              border: "1px solid #656161",
              backgroundColor: "white",
              borderRadius: "50%",
              cursor: "pointer",
            }}>
            <Image
              preview={false}
              src="data:image/png;base64,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"
              style={{ borderRadius: "30%" }}
              width={50}
              height={50}
            />
          </Flex>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
              <h2>
                {`  
            ${createId?.text
                    ? "Ավելացնել " + createId.text + ` ${createId.label}-ին`
                    : "փոփոխել " + createId?.edit + "-ին"
                  } `}
              </h2>
              <Col span={24}>
                <Form.Item name={"gender"}>
                  <Radio.Group
                    onChange={(e) => handleChange("gender", e.target.value)}>
                    <Radio value="Male">Արական</Radio>
                    <Radio value="Female">Իգական</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Անուն" name={"name"}>
                  <Input
                    placeholder={"Անուն"}
                  />
                </Form.Item>
                <Form.Item label="Էլեկտրոնային հասցե" name={"email"}>
                  <Input
                    placeholder={"Էլեկտրոնային հասցե"}
                  />
                </Form.Item>
                <Col>
                  <Row style={{ padding: 0, paddingBottom: "8px" }}>
                    <Col span={24}> Ծննդյան ամսաթիվ </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <Form.Item name={"day"}>
                        <Select
                          placeholder={"օր"}
                          dropdownStyle={{ width: 60 }}
                          style={{ maxWidth: 60 }}>
                          {days.map((d) => (
                            <Select.Option key={d + ""} value={d + ""}>
                              {d}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item name={"month"}>
                        <Select
                          placeholder={"ամիս"}
                          dropdownStyle={{ width: 120 }}
                          style={{ maxWidth: 120 }}>
                          {months.map((m) => (
                            <Select.Option
                              style={{ minWidth: "120px" }}
                              key={m + ""}
                              value={m + ""}>
                              {m}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name={"year"}>
                        <Input placeholder={"տարի"} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Col>
              <Col span={12}>
                <Form.Item label="Ազգանուն" name={"lastName"}>
                  <Input
                    placeholder={"Ազգանուն"}
                  />
                </Form.Item>
                <Form.Item label="Հեռախոսահամար" name={"phoneNumber"}>
                  <Input
                    placeholder={"Հեռախոսահամար"}
                  />
                </Form.Item>
                <Form.Item label="Ծննդավայր" name="PlaceOfBirth">

                  <Input
                    onClick={() => {
                      setLocation({ ...location, birthOrDeath: "" });
                    }}
                    suffix={
                      <Image
                        preview={false}
                        width={30}
                        height={30}
                        style={{ cursor: "pointer" }}
                        src="data:image/png;base64,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"
                      />
                    }
                    placeholder={"Ծննդավայր"}
                  />
                </Form.Item>
                <Form.Item
                  label="Ողջ կամ մահացած"
                  name={"deathOrAlive"}
                  initialValue={formData.aliveStatus}>
                  <Radio.Group
                    onChange={(e) =>
                      handleChange("aliveStatus", e.target.value)
                    }>
                    <Radio value="Alive">Ողջ</Radio>
                    <Radio value="Dead">Մահացած</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            {formData.aliveStatus === "Dead" && (
              <Row gutter={16}>
                <Col span={12}>
                  <Row style={{ padding: 0, paddingBottom: "8px" }}>
                    <Col span={24}>Մահվան ամսաթիվ</Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <Form.Item name={"deathDay"}>
                        <Select
                          placeholder={"օր"}
                          dropdownStyle={{ width: 60 }}
                          style={{ maxWidth: 60 }}>
                          {days.map((d) => (
                            <Select.Option key={d + ""} value={d + ""}>
                              {d}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item name={"deathMonth"}>
                        <Select
                          placeholder={"ամիս"}
                          dropdownStyle={{ width: 120 }}
                          style={{ maxWidth: 120 }}>
                          {months.map((m) => (
                            <Select.Option key={m + ""} value={m + ""}>
                              {m}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name={"deathYear"}>
                        <Input placeholder={"տարի"} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Form.Item label="Մահվան վայր" name={"placeOfDeath"}>
                    <Input
                      onClick={() => {
                        setLocation({ ...location, birthOrDeath: "death" });
                      }}
                      suffix={
                        <Image
                          width={30}
                          height={30}
                          src="data:image/png;base64,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"
                          preview={false}
                          style={{ cursor: 'pointer' }}
                        />
                      }

                      placeholder={"Մահվան վայր"}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
            <Form.Item>
              <Flex gap={16} justify="center" style={{ marginTop: "20px" }}>
                <Button type="primary" htmlType="submit">
                  Ավելացնել
                </Button>
                <Button
                  onClick={() => {
                    setCreateId(undefined);
                    form.resetFields();
                  }}>
                  Չեղարկել
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Modal>
    </>
  );
};

export default UserForm;
