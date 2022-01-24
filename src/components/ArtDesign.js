import { motion } from 'framer-motion'
import { useEffect, useRef, lazy, Suspense } from "react";
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { YinYang } from "./AllSvgs";
import { ArtDesignData } from "./ArtDesignData";
import { DarkTheme, mediaQueries } from './Themes'

import Loading from '../subComponents/Loading';

//Components
const SocialIcons = lazy(() => import('../subComponents/SocialIcons'))
const PowerButton = lazy(() => import('../subComponents/PowerButton'))
const LogoComponent = lazy(() => import('../subComponents/LogoComponent'))
const ParticlesComponent = lazy(() =>
  import('../subComponents/ParticlesComponent')
)
const BigTitle = lazy(() => import('../subComponents/BigTitle'))


const Box = styled(motion.div)`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`

const float = keyframes`
0% { transform: translateY(-10px)         }
    50% { transform: translateY(15px) translateX(15px)        }
    100% { transform: translateY(-10px)         }
`

const Main = styled(motion.ul)`
  position: fixed;
  top: 12rem;
  left: calc(10rem + 15vw);

  height: 40vh;
  margin: 2rem;

  display: flex;

  ${mediaQueries(50)`
        
        
        left:calc(8rem + 15vw);

  `};

  ${mediaQueries(40)`
  top: 30%;
        
        left:calc(6rem + 15vw);

  `};

  ${mediaQueries(40)`
        
        left:calc(2rem + 15vw);

  `};
  ${mediaQueries(25)`
        
        left:calc(1rem + 15vw);

  `};
`;

const Rotate = styled.span`
  display: block;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 80px;
  height: 80px;

  z-index: 1;
  ${mediaQueries(40)`
     width:60px;
         height:60px;   
       svg{
         width:60px;
         height:60px;
       }

  `};
  ${mediaQueries(25)`
        width:50px;
         height:50px;
        svg{
         width:50px;
         height:50px;
       }

  `};
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
    },
  },
};


const ArtDesignPage = () => {
  const ref = useRef(null);

  const yinyang = useRef(null);

  useEffect(() => {
    let element = ref.current;

    const rotate = () => {
      element.style.transform = `translateX(${-window.pageYOffset}px)`;

      return (yinyang.current.style.transform =
        "rotate(" + -window.pageYOffset + "deg)");
    };

    window.addEventListener("scroll", rotate);
    return () => {
      window.removeEventListener("scroll", rotate);
    };
  }, []);
  return (
    <ThemeProvider theme={DarkTheme}>
      <Suspense fallback={<Loading/>}>
        <Box
          key='skills'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}>
          <LogoComponent theme='dark' />
          <PowerButton />
          <SocialIcons theme='dark' />
          <ParticlesComponent theme='dark' />

          <Main ref={ref} variants={container} initial="hidden" animate="show">
            {ArtDesignData.map((d) => (
                        <img src={d.img} />
            ))}
         
         
    
          </Main>
          <Rotate ref={yinyang}>
            <YinYang width={80} height={80} fill={DarkTheme.text} />
          </Rotate>
   
          <BigTitle text='Art + Design' top='10%' left='5%' />
        </Box>
      </Suspense>
    </ThemeProvider>
  );
};

export default ArtDesignPage
