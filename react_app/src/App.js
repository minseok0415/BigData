import { useEffect, useState } from "react";
import { storage, firestore } from "./firebase.js";
import { ref, getDownloadURL, listAll } from "firebase/storage";

const App = () => {
  const [image, setImage] = useState("");

  const [before, setBefore] = useState({});
  const [change, setChange] = useState({});

  async function getData() {
    await firestore.collection("mbti").doc("K-MBTI").get().then((doc) => {
      setBefore(doc.data());
    })
  }

  async function getImage() {
    const imageRef = ref(storage, `gs://p1xel-art.appspot.com/`);
    await listAll(imageRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImage(url);
        });
      });
    });
  }

  useEffect(() => {
    getData();
    getImage();
  }, []);

  function complete() {
    const mbti = PS + MN + BJ + TW;
    if (mbti.length !== 4) return
    setChange(change[mbti] = before[mbti] + 1);
    firestore.collection("mbti").doc("K-MBTI").update(change);
    firestore.collection("mbti").doc("K-MBTI").get().then((doc) => {
      setBefore(doc.data());
      setChange({})
    })
    setScroll(7);
  };

  function division(c) {
    let css;
    if (c === "cover") css = {
      display: "flex",
      width: "50%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      objectFit: c
    }
    else css = {
      display: "flex",
      width: "50%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontSize: "80px",
      fontWeight: "900",
      cursor: "pointer",
      backgroundColor: c,
      wordBreak: "keep-all"
    }
    return css;
  }

  const wrap = {
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center"
  }

  const Sbutton = {
    width: "30rem",
    height: "10rem",
    borderRadius: "10rem",
    border: "10px solid black",
    backgroundColor: "white",
    fontSize: "3rem",
    fontWeight: "900",
    cursor: "pointer"
  }

  const Sbutton1 = {
    width: "15rem",
    height: "5rem",
    borderRadius: "10rem",
    border: "10px solid black",
    backgroundColor: "white",
    fontSize: "2rem",
    fontWeight: "900",
    cursor: "pointer",
    marginLeft: "3rem"
  }

  const [PS, setPS] = useState("");
  const [MN, setMN] = useState("");
  const [BJ, setBJ] = useState("");
  const [TW, setTW] = useState("");
  const [scroll, setScroll] = useState(1);

  useEffect(() => {
    window.scrollTo({top: 5000, behavior: "smooth"})
  })

  function percent(mbti) {
    return Math.round((before[mbti]/Object.values(before).reduce((a, b) => a+b, 0)*100)*100)/100;
  }

  return (
    <div>
      {scroll === 1 && <div style={wrap}>
        <button style={Sbutton} onClick={() => setScroll(2)}>테스트 시작하기</button>
      </div>}
      {2 <= scroll && scroll <= 5 && <div style={wrap} onClick={() => (setScroll(3))}>
        <div style={division("violet")} onClick={() => setPS("P")}>
          팥 붕어빵
        </div>
        <div style={division("wheat")} onClick={() => setPS("S")}>
          슈크림 붕어빵
        </div>
      </div>}
      {3 <= scroll && scroll <= 5 && <div style={wrap} onClick={() => (setScroll(4))}>
        <div style={division("cyan")} onClick={() => setMN("M")}>
          민초파
        </div>
        <div style={division("magenta")} onClick={() => setMN("N")}>
          반민초파
        </div>
      </div>}
      {4 <= scroll && scroll <= 5 && <div style={wrap} onClick={() => (setScroll(5))}>
        <div style={division("brown")} onClick={() => setBJ("B")}>
          부먹
        </div>
        <div style={division("orange")} onClick={() => setBJ("J")}>
          찍먹
        </div>
      </div>}
      {scroll === 5 && <div style={wrap} onClick={() => (setScroll(6))}>
        <div style={division("pink")} onClick={() => setTW("T")}>
          딱복 (백도)
        </div>
        <div style={division("gold")} onClick={() => setTW("W")}>
          물복 (황도)
        </div>
      </div>}
      {scroll === 6 && <div style={wrap}>
        <button style={Sbutton} onClick={() => complete()}>완료</button>
      </div>}
      {scroll === 7 &&
        <div style={wrap}>
          <img
            src={image}
            style={division("cover")}
            alt="Pie Chart of K-MBTI"
          />
          <div style={division("white")}>{PS+MN+BJ+TW}<br />{percent(PS+MN+BJ+TW)}%<button style={Sbutton1} onClick={() => window.location.reload()}>다시하기</button></div>
        </div>
      }
    </div>
  );
};
export default App;