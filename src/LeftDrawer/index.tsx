import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ModelConfig } from "@antv/g6";
import { Button, Flex, Image } from "antd";
import  { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ILeftDrawer {
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    setCreateId: React.Dispatch<SetStateAction< undefined| ModelConfig>>
}

const LeftDrawer:React.FC<ILeftDrawer>
 = ({setOpen,setCreateId}) => {
  const [visible, setVisible] = useState(true);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  const navigate = useNavigate();

  return (
    <Flex className="app-container" style={{zIndex:10}}>
      <Flex className={`sidebar ${visible ? "visible" : ""}`} vertical gap={20}>
        <Flex gap={20}>
            <Flex onClick={()=>{
                setOpen(true)
            }} justify="center" align="center" style={{width:'70px', height:'70px',border:'1px solid #656161', backgroundColor:'white',borderRadius:'50%', cursor:'pointer'}}>

            <Image  preview={false} src="data:image/png;base64,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" style={{borderRadius:'30%'}} width={50} height={50} />
            </Flex>

            <Flex justify="center" vertical style={{
                height:'60px'
            }} gap={5}>
            <div>Անուն</div>
            <div>2001թ <span>23 տարեկան</span></div>
            </Flex>
           
        </Flex>
        <Flex gap={20} justify='space-evenly'>

            <Image onClick={()=>{

                setCreateId({label:'anun'})
            }}  preview={false} src='data:image/jpeg;base64,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' width={48} height={48} style={{borderRadius:'50%',border:'1px solid #656161', cursor:'pointer'}}> </Image>
<Flex  onClick={()=>{
    setCreateId({edit:'anun'})
}} justify="center" align="center" style={{width:'48px', height:'48px', borderRadius:'50%', backgroundColor:'#fdfcfc', border:'1px solid #656161', cursor:'pointer',}}>

<Image preview={false} width={30} height={30} style={{borderRadius:'50%'}} src="data:image/png;base64,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" />
</Flex>
<Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWavpCMzr6ZyAy1zCUr1uB5Jj9NgL2xDFgQ&s" width={48} height={48} style={{borderRadius:'50%', border:'1px solid #656161', cursor:'pointer'}} preview={false} />
        </Flex>
        <Flex vertical gap={10}>
        <h2>Ընտանիքի կազմ</h2>
        <div>հայր՝</div>
        <div>մայր՝</div>
        <div>քույր՝</div>
        <div>եղբայր՝</div>
        <div>ամուսին՝</div>
        <div>որդի՝</div>
        <div>դուստր՝</div>

        </Flex>
        <Flex vertical gap={10}>
            <h2>Կարևոր իրադարձություններ`</h2>
            <div>մահվան տարեթիվ՝</div>
            <div>Ամուսնության տարեթիվ՝ </div>
        </Flex>
      <Button
        onClick={() => {
          navigate("/Pdf");
        }}>
        Սեղմեք pdf-ի համար
      </Button>
      </Flex>
      <Flex className={`content ${visible ? "visible" : ""}`}>
        <Button  style={{borderRadius: `${!visible ? '0 50%  50% 0' : '50% 0 0 50%'}`, width:'40px',height:'40px'}} onClick={toggleSidebar}>
          {visible ? <LeftOutlined /> : <RightOutlined />}
        </Button>
      </Flex>

    </Flex>
  );
};

export default LeftDrawer;
