import { ModelConfig } from "@antv/g6";
import { Flex } from "antd";

const Squery: React.FC<{direction?:string, text:string[], setCreateId:React.Dispatch<React.SetStateAction< undefined | ModelConfig>>, createId: undefined | ModelConfig}> = ({ direction, text, setCreateId,createId }) => {
  return (
    <Flex
      gap={30}
      style={{ display: "flex", flexDirection: direction ? "column" : "row", zIndex: 111 }}>
      <Flex
        justify="center"
        align="center"
        style={{
          border: "2px solid pink",
          width: "170px",
          height: "50px",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor:'#FFF',
          cursor:'pointer'
        }} 
        onClick={()=>{
          setCreateId({...createId, text:text[0]})
        }}
        >
       ավելացնել {text[0]}
      </Flex>
      <Flex
        justify="center"
        align="center"
        style={{
          border: "2px solid blue",
          width: "170px",
          height: "50px",
          borderRadius: "10px",
          backgroundColor:'#fff',
          cursor:'pointer'
        }}
        onClick={()=>{
          setCreateId({...createId, text:text[1]})
        }}
        >
       ավելացնել {text[1]}
      </Flex>
    </Flex>
  );
};

export default Squery;
