import { Flex } from "antd";
import Squery from "./Squery";
import FamilyDiagramModal from "./FamilyDiagramModal";
import { SetStateAction } from "react";
import { ModelConfig } from "@antv/g6";

interface IFamilyModal {
  createId?: ModelConfig;
  setCreateId: React.Dispatch<SetStateAction<undefined | ModelConfig>>;
}

const FamilyModal: React.FC<IFamilyModal> = ({ createId, setCreateId }) => {
  return (
    <>
      <FamilyDiagramModal
        centered
        open={!!createId && !createId?.text && !createId?.edit}
        onCancel={() => {
          setCreateId(undefined);
        }}
        style={{
          width: "780px",
        }}
        footer={null}>
        <Flex
          style={{
            width: "100%",
            height: "100%",
          }}
          justify="center"
          align="center">
          <Flex
            style={{
              minWidth: "750px",
              minHeight: "440px",
              position: "relative",
            }}>
            <Flex
              justify="center"
              align="center"
              style={{
                position: "absolute",
                left: "35%",
                top: "40%",
                width: "200px",
                height: "100px",
                border: "2px solid blue",
                borderRadius: "10px",
                backgroundColor: "#fff",
                zIndex: 111,
              }}>
              {createId?.label}
            </Flex>

            <Flex style={{ position: "absolute", left: "23.5%", top: "15%" }}>
              <Flex gap={30} style={{ zIndex: 1000 }}>
                <Flex
                  justify="center"
                  align="center"
                  style={{
                    border: "2px solid pink",
                    width: "170px",
                    height: "50px",
                    borderRadius: "10px",
                    textAlign: "center",
                    backgroundColor: "#FFF",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCreateId({ ...createId, text: "մայր" });
                  }}>
                  ավելացնել մայր
                </Flex>
                <Flex
                  justify="center"
                  align="center"
                  style={{
                    border: "2px solid blue",
                    width: "170px",
                    height: "50px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCreateId({ ...createId, text: "հայր" });
                  }}>
                  ավելացնել հայր
                </Flex>
              </Flex>
            </Flex>

            <Flex style={{ position: "absolute", left: "225px", top: "15%" }}>
              <svg width="auto" height="auto">
                <path
                  d="M 140 110 
                    L 140 25
                    L 156 25
                    "
                  stroke="white"
                  strokeWidth="1"
                  fill="transparent"
                />
              </svg>
            </Flex>
            <Flex style={{ position: "absolute", left: "225px", top: "15%" }}>
              <svg width="auto" height="auto">
                <path
                  d="M 140 110 
                     L 140 25
                     L 122 25
                     "
                  stroke="white"
                  strokeWidth="1"
                  fill="transparent"
                />
              </svg>
            </Flex>

            <Flex style={{ position: "absolute", left: "23.5%", top: "75%" }}>
              <Squery
                text={["դուստր", "որդի"]}
                setCreateId={setCreateId}
                createId={createId}
              />
            </Flex>

            <Flex style={{ position: "absolute", left: "225px", top: "55%" }}>
              <svg width="auto" height="auto">
                <path
                  d="M 140 5 
                     L 140 115
                     L 125 115
                     L 155 115
                    "
                  stroke="white"
                  strokeWidth="1"
                  fill="transparent"
                />
              </svg>
            </Flex>

            <Flex style={{ position: "absolute", left: "55px", top: "37%" }}>
              <Squery
                direction={"chachacha"}
                text={["քույր", "եղբայր"]}
                setCreateId={setCreateId}
                createId={createId}
              />
            </Flex>

            <Flex style={{ position: "absolute", left: "0", top: "43%" }}>
              <svg width="auto" height="auto">
                <path
                  d="M 500 40 
                     L 140 40
                     L 140 20
                     L 140 60
                    "
                  stroke="white"
                  strokeWidth="1"
                  fill="transparent"
                />
              </svg>
            </Flex>

            <Flex
              onClick={() => {
                setCreateId({ ...createId, text: "ամուսին" });
              }}
              style={{ position: "absolute", left: "67%", top: "43%" }}>
              <Flex
                justify="center"
                align="center"
                style={{
                  border: "2px solid pink",
                  width: "170px",
                  height: "70px",
                  borderRadius: "10px",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  zIndex: 1,
                }}>
                ավելացնել ամուսին
              </Flex>
            </Flex>
            <Flex style={{ position: "absolute", left: "304px", top: "42%" }}>
              <svg width="auto" height="auto">
                <path
                  d="M 200 40 
                    L 160 40
                    "
                  stroke="white"
                  strokeWidth="1"
                  fill="transparent"
                />
              </svg>
            </Flex>
          </Flex>
        </Flex>
      </FamilyDiagramModal>
    </>
  );
};

export default FamilyModal;
