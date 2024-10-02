import { Image } from "antd";
import { SetStateAction } from "react";
interface IBackGroundImage {
    setImageUrl:React.Dispatch<SetStateAction<string>>
    source:string;
}

const BackgroundImage:React.FC<IBackGroundImage> = ({setImageUrl, source}) => {

    console.log(source)
    return(

        <Image
          preview={false}
          style={{ borderRadius: "10px", objectFit:'cover' }}
          onClick={() => {
            setImageUrl(source);
          }}
          width={150}
          height={150}
          src={source}
        />
    )
};

export default BackgroundImage
