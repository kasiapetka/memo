import image1 from "../../../images/1F5A4_color.png";
import image2 from "../../../images/1F60B_color.png";
import image3 from "../../../images/1F60D_color.png";
import image4 from "../../../images/1F60E_color.png";
import image5 from "../../../images/1F62D_color.png";
import image6 from "../../../images/1F62E-200D-1F4A8_color.png";
import image7 from "../../../images/1F90D_color.png";
import image8 from "../../../images/1F92F_color.png";
import image9 from "../../../images/1F602_color.png";
import image10 from "../../../images/1F634_color.png";
import image11 from "../../../images/1F635-200D-1F4AB_color.png";
import image12 from "../../../images/1F643_color.png";
import image13 from "../../../images/1F910_color.png";
import image14 from "../../../images/1F914_color.png";
import image15 from "../../../images/1F920_color.png";
import image16 from "../../../images/1F925_color.png";
import image17 from "../../../images/1F973_color.png";
import image18 from "../../../images/1F976_color.png";

const IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
];

const DEFAULT_CARDS = [];

for (let i = 1; i <= 18; i++) {
  DEFAULT_CARDS.push({
    id: i,
    img: IMAGES[i - 1],
    isFlipped: false,
  });
}

export default DEFAULT_CARDS;
