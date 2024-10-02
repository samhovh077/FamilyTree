import { SetStateAction, useEffect, useRef, useState } from "react";
import G6, { EdgeConfig, NodeConfig } from "@antv/g6";
import { Button, Flex, Image, Upload, Slider, InputNumberProps } from "antd";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { UploadOutlined } from "@ant-design/icons";
import { familytrees } from "../base64";
import BackgroundImage from "./Image";

const Pdf: React.FC = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);
  const [imageUrl, setImageUrl] = useState(familytrees.tree1);

  const onChange: InputNumberProps["onChange"] = (newValue) => {
    setOpacity(newValue as number);
  };

  const uploadPropsImage = (setUrl: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  }) => {
    return {
      maxCount: 1,
      showUploadList: false,
      accept: ".jpeg, .png, .jpg, .webp, .JPEG, .PNG, .JPG",
      customRequest: (options: { file: string | Blob}): void => {
        const { file } = options;
        const reader = new FileReader();
        reader.onload = (): void => {
          const result = reader.result as string;
          if (result !== null) {
            setUrl?.(result);
          }
        };
        reader.readAsDataURL(file as Blob);
      },
    };
  };

  async function generatePDF() {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      console.error("Canvas not found in the document.");
      return;
    }

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    console.log(pdf, "pdf");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdf.internal.pageSize.width;
    const imgHeight = pdf.internal.pageSize.height;
    const imgRatio = imgWidth / imgHeight;

    let finalImgWidth, finalImgHeight;
    if (imgWidth > imgHeight) {
      finalImgWidth = pdfWidth;
      finalImgHeight = finalImgWidth / imgRatio;
    } else {
      finalImgHeight = pdfHeight;
      finalImgWidth = finalImgHeight * imgRatio;
    }

    const x = (pdfWidth - finalImgWidth) / 2;
    const y = (pdfHeight - finalImgHeight) / 2;
    const canvas2 = document.createElement("canvas");
    const ctx = canvas2.getContext("2d");
    canvas2.width = finalImgWidth;
    canvas2.height = finalImgHeight;

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const img = await createImageBitmap(blob);

    ctx !== null ? (ctx.fillStyle = "white") : undefined;
    ctx !== null
      ? ctx.fillRect(0, 0, finalImgWidth, finalImgHeight)
      : undefined;
    console.log(ctx);

    ctx !== null ? (ctx.globalAlpha = -0.01 * opacity + 1.0) : undefined;
    ctx !== null
      ? ctx.drawImage(img, 0, 0, finalImgWidth, finalImgHeight)
      : undefined;

    const bacgroundData = canvas2.toDataURL("image/jpeg");

    pdf.addImage(bacgroundData, "JPEG", x, y, finalImgWidth, finalImgHeight);
    pdf.addImage(imgData, "PNG", x, y, finalImgWidth, finalImgHeight);

    pdf.save("graph.pdf");
  }

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    G6.registerNode("pdfNode", {
      draw(cfg, group) {
        const keyShapee = group.addShape("circle", {
          attrs: {
            x: 0,
            y: 0,
            r: 60,
            stroke: "#fc0909",
            lineWidth: 2,
          },
        });
        const sdsd = group.addShape("image", {
          attrs: {
            x: -60,
            y: -60,
            width: 120,
            height: 120,
            img: cfg.img
              ? cfg.img
              : cfg.gender === "female"
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrgQ0s2VaKANXgOVqiLq8nrJPb85g5XvP7Cw&s"
              : "data:image/png;base64,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",
            opacity: cfg.opacity ? 0 : 1,
          },
          name: "image-shape",
        });

        sdsd.setClip({
          type: "circle",
          attrs: {
            r: 57,
            opacity: cfg.opacity ? 0 : 1,
          },
        });

        group.addShape("circle", {
          attrs: {
            r: 60,
            stroke: "#98b5c6",
            lineWidth: 1,
            opacity: cfg.opacity ? 0 : 1,
          },
        });

        group.addShape("text", {
          attrs: {
            text: cfg.label,

            y: 75,
            textAlign: "center",
            fontSize: 28,
            textBaseline: "middle",
            fill: "#040404",
          },
        });

        group.addShape("text", {
          attrs: {
            text: "2000թ",
            y: 110,
            textAlign: "center",
            fontSize: 28,
            textBaseline: "middle",
            fill: "#040404",
          },
        });

        return keyShapee;
      },
    });
    G6.registerEdge("line-straight", {
      options: {
        style: {
          stroke: "#ccc",
        },
      },
      draw: function draw(cfg, group) {
        const nodee = graph.findById(cfg.source as string);
        const startPoint = nodee.getModel();
        const nodee2 = graph.findById(cfg.target as string);
        const endPoint = nodee2.getModel();

        const stroke =
          (cfg.style && cfg.style.stroke) || this.options?.style?.stroke;
        const startArrow = (cfg.style && cfg.style.startArrow) || undefined;
        const endArrow = (cfg.style && cfg.style.endArrow) || undefined;

        const line = cfg.length
          ? (startPoint.x as number) - (endPoint.x as number) < 40 &&
            ((startPoint.x as number) - (endPoint.x as number)) * -1 < 40
          : undefined;

        const keyShape = group.addShape("path", {
          attrs: {
            path: [
              ["M", startPoint.x, startPoint.y],
              ["L", startPoint.x, (startPoint.y as number) + 140],
              [
                "L",
                line ? startPoint.x : endPoint.x,
                (startPoint.y as number) + 140,
              ],
              ["L", line ? startPoint.x : endPoint.x, endPoint.y],
            ],
            stroke,
            lineWidth: 1,
            startArrow,
            endArrow,
          },
          className: "edge-shape",
          name: "edge-shape",
        });
        return keyShape;
      },
    });
    const graph = new G6.Graph({
      container: containerRef.current,
      width: containerRef?.current?.offsetWidth,
      height: containerRef?.current?.offsetHeight,
      modes: {
        default: [
          "drag-canvas",
          "zoom-canvas",
          {
            type: "collapse-expand-group",
            trigger: "click",
          },
        ],
      },
      minZoom: 0.2,
      maxZoom: 2,
      fitView: true,
      fitViewPadding: [50],

      defaultNode: {
        type: "pdfNode",
      },
      defaultEdge: {
        type: "line-straight",
        style: {
          stroke: "#000000",
          lineWidth: 2,
        },
      },
      layout: {
        type: "dagre",
        rankdir: "TB",
        nodesep: 50,
        ranksep: 32,
      },
    });

    const changeItems: {
      spouceid: string;
      personId: string;
      personSpouceId: string;
    }[] = [];

    function transformFamilyData(people: IPeople[]) {
      const nodes: NodeConfig[] = [];
      const edges: EdgeConfig[] = [];

      function processPerson(person: IPeople) {
        nodes.push({
          opacity: 0,
          gender: "male",
          id: person.id,
          label: person.name,
          img: "data:image/jpeg;base64,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",
        });

        if (person.spouse) {
          nodes.push({
            opacity: 0,
            gender: "female",
            id: person.spouse.id,
            label: person.spouse.name,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7a0mQF2IC5YErZw5AtJjuCt7Zpm93JpRiGw&s",
          });
          nodes.push({
            id: person.id + "12",
            label: "",
            size: 0.1,
            type: "circle",
          });
          edges.push({
            source: person.spouse.id,
            target: person.id + "12",

            type: "line",
          });
          edges.push({
            source: person.id,
            target: person.id + "12",
            type: "line",
          });
          changeItems.push({
            spouceid: person?.id + "12",
            personId: person?.id,
            personSpouceId: person?.spouse?.id,
          });

          if (person.children) {
            person.children.forEach((child: IPeople, i: number) => {
              processChild(
                child,
                person.id + "12",
                i,
                person?.children?.length ? person.children.length : 0
              );
            });
          }
        }
      }

      function processChild(
        person: IPeople,
        parentId: string,
        child: number,
        lastChild: number
      ) {
        const right =
          (child === 0 || lastChild === child + 1) && lastChild !== 1
            ? true
            : false;
        nodes.push({
          opacity: 0,
          gender: "male",
          id: person.id,
          label: person.name,
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNtANZGskideyT1498YlPH0o93sR8Ak6DPxQ&s",
        });
        edges.push({
          source: parentId,
          target: person.id,
          direction:
            right && lastChild === child + 1 ? 1 : right ? -1 : undefined,
          length: lastChild === 1,
        });

        if (person.spouse) {
          nodes.push({
            gender: "female",
            id: person.spouse.id,
            label: person.spouse.name,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7a0mQF2IC5YErZw5AtJjuCt7Zpm93JpRiGw&s",
          });
          nodes.push({
            id: person.id + "12",
            size: 1,
            type: "dom-node",
          });
          edges.push({
            source: person.spouse.id,
            target: person.id + "12",
            type: "line",
          });
          edges.push({
            source: person.id,
            target: person.id + "12",
            type: "line",
          });
          changeItems.push({
            spouceid: person?.id + "12",
            personId: person?.id,
            personSpouceId: person?.spouse?.id,
          });

          if (person.children) {
            person.children.forEach((child: IPeople, i: number) => {
              processChild(
                child,
                person.id + "12",
                i,
                person?.children?.length ? person.children.length : 0
              );
            });
          }
        }
      }

      people.forEach((person: IPeople) => {
        processPerson(person);
      });

      return { nodes, edges };
    }

    interface ISpouse {
      id: string;
      name: string;
    }

    interface IPeople {
      id: string;
      name: string;
      spouse?: ISpouse;
      children?: IPeople[];
    }

    interface IFamilyData {
      people: IPeople[];
    }

    const familyData: IFamilyData = {
      people: [
        {
          id: "101",
          name: "John Smith",
          spouse: { id: "102", name: "Jane Doe" },
          children: [
            {
              id: "201",
              name: "Alice Smith",
              spouse: { id: "301", name: "Tom Brown" },
              children: [
                { id: "401", name: "Mia Brown" },
                { id: "402", name: "Noah Brown" },
              ],
            },
            {
              id: "202",
              name: "Bob Smith",
              spouse: { id: "302", name: "Emily Stone" },
              children: [
                {
                  id: "1235sadas48",
                  name: "Harry Potter",
                  spouse: {
                    id: "jdhuyfvoY654645645",
                    name: "shakira",
                  },
                  children: [
                    {
                      id: "kalsjdhjekfffewefwefewfwefwefwef",
                      name: "Puyol",
                    },
                  ],
                },
              ],
            },
            {
              id: "2022",
              name: "Bob Smith",
              spouse: { id: "303", name: "Emily Stone" },
              children: [
                {
                  id: "er",
                  name: "Gary Smith",
                  spouse: { id: "jijiji", name: "oiuy" },
                  children: [
                    { id: "tyh", name: "Helen Smith" },
                    { id: "878787", name: "Helen Smith" },
                    { id: "4567567ert04", name: "Helen Smith" },
                    { id: "43456ert04", name: "Helen Smith" },
                  ],
                },
                {
                  id: "4ert04",
                  name: "Helen Smith",
                  spouse: { id: "jijfdgiji", name: "oiuy" },
                  children: [
                    { id: "terhreyhyh", name: "Helen Smith" },
                    { id: "8787ty87", name: "Helen Smith" },
                    { id: "456teyhe7567ert04", name: "Helen Smith" },
                    { id: "43456erethyett04", name: "Helen Smith" },
                  ],
                },
              ],
            },
            {
              id: "2032",
              name: "Bob Smith",
              spouse: { id: "302asd", name: "Emily Stone" },
              children: [
                { id: "403cs", name: "Gary Smith" },
                { id: "4asdgvr04", name: "Helen Smith" },
                {
                  id: "dscdscdsc",
                  name: "janluijiBug",
                  spouse: {
                    id: "mnbvcxz12",
                    name: "donnaruma",
                  },
                  children: [
                    { id: "4asd04", name: "Helen Smith" },
                    { id: "4a8787sd04", name: "Helen Smith" },
                    { id: "4asd984504", name: "Helen Smith" },
                  ],
                },
                { id: "sdc", name: "lallala" },
                { id: "17818181", name: "sdsdsdsd" },
              ],
            },
          ],
        },
      ],
    };

    const transformedData = transformFamilyData(familyData.people);

    graph.data(transformedData);
    graph.render();

    graph.on("afterlayout", () => {
      changeItems.forEach((val) => {
        const node = graph.findById(val.personId);
        const nodeId1 = graph.findById(val.spouceid);
        const nodeId2 = graph.findById(val.personSpouceId);
        graph.update(nodeId2, {
          x: (node.getModel().x as number) - 170,
        });
        const x =
          ((node.getModel().x as number) + (nodeId2.getModel().x as number)) /
          2;
        const y = node.getModel().y;
        graph.updateItem(nodeId1, {
          x: x,
          y: y,
        });
      });
    });

    return () => {
      graph.destroy();
    };
  }, []);

  return (
    <Flex style={{ position: "relative" }} gap={20}>
      <Flex>
        <div
          className="canvas"
          ref={containerRef}
          style={{
            width: "990px",
            height: "700px",
            zIndex: 1,
            position: "absolute",
          }}
        />
        <Image
          width={"990px"}
          height={"700px"}
          src={imageUrl}
          preview={false}
          style={{
            position: "absolute",
            width: "990px",
            height: "700px",
            opacity: -0.01 * opacity + 1.0,
            overflow:'hidden'
          }}
        />
      </Flex>
      <Flex vertical gap={50}>
        <Flex vertical gap={10}>
          <Button
            onClick={() => {
              navigate("/");
            }}>
            go back
          </Button>
        </Flex>
        <Flex style={{ cursor: "pointer" }} vertical gap={10}>
          <Upload {...uploadPropsImage(setImageUrl)}>
            <Button icon={<UploadOutlined />}>
              Ներբեռնեք նկարը ետնամասի համար
            </Button>
          </Upload>
          <div>Ընտրեք ֆոնը՝</div>
          <Flex gap={10}>
            <BackgroundImage
              setImageUrl={setImageUrl}
              source={familytrees.tree1}
            />
            <BackgroundImage
              setImageUrl={setImageUrl}
              source={familytrees.tree2}
            />
          </Flex>
          <Flex gap={10}>
            <BackgroundImage
              setImageUrl={setImageUrl}
              source={familytrees.tree3}
            />
            <BackgroundImage
              setImageUrl={setImageUrl}
              source={familytrees.tree4}
            />
          </Flex>
          <Flex vertical>
            <div>Ընտրեք թափանցիկությունը</div>
            <Slider min={1} max={100} value={opacity} onChange={onChange} />
          </Flex>
          <Button onClick={generatePDF}>Ստեղծել pdf ֆայլ</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Pdf;
