import { useEffect, useState } from 'react';
import Link from 'next/link';
import YouTube from 'react-youtube';
import style from '../Youtube.module.css';
import type { AllJoinData, Vtuber, VtuberMovie } from '../types/singdata'; //type{}で型情報のみインポート
import DeleteButton from '../components/DeleteButton';
import { useRouter } from 'next/router';

// const Example = () => {
//   const opts = {
//     height: '390',
//     width: '640',
//     playerVars: {
//       // https://developers.google.com/youtube/player_parameters
//       autoplay: 1,
//     },
//   };}

//分割代入？
// 型注釈IndexPage(posts: Post) またはusestateに型注釈するぽい
function AllDatePage( posts : AllJoinData )  {
  // const [data, setData] = useState<AllColumnsData[]>([]);
  // const [data, setData] = useState<AllColumnsData>({ streamers: [], movies: [] });
  const [data, setData] = useState<AllJoinData[]>();

  const router = useRouter();
  const { streamer_id } = router.query;

  useEffect(() => {  //useEffect:関数の実行タイミングをReactのレンダリング後まで遅らせるhook
    if (streamer_id) { //idが定義されている場合に処理
      console.log("Fetching data for Unique_id=", streamer_id);
      fetch(`http://localhost:8080/movie?streamer_id=${streamer_id}`)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        setData(data.karaoke_lists);
      });
  }}, [streamer_id]);

  return (
    <div>
      <h4>ここに選択した1つの動画の名前とyoutube埋め込みを掲載</h4>
      <h4>下表の歌をクリックするか、前へ次へボタンで表示動画を切り替える</h4>

      [streamer].tsxにて<br /><br />


        <Link href={`/create`} ><u>歌登録</u></Link>
      <table border={4} >
        <thead> {/* ← tabeleのhead */}
          <tr>
            <td>推し</td>
            <td>動画ID</td>
            <td>動画名</td>
            <td>動画名</td>
            <td>歌ID</td>
            <td>曲名</td>    
            <td>編集</td>
          </tr>
        </thead>
         
        <tbody>
          {data && data.map((item, index) => (
          <tr key={index}>
            <td>{item.VtuberId}</td>
            <td>{item.VtuberName}</td>
            <td>{item.VtuberKana}</td>
       
              {item.SelfIntroUrl ? (
            <td><Link href={item.SelfIntroUrl}>youtube</Link></td>
            ) : (
            <td>未登録</td>
        )}
                        
              {/* if (${item.self_intro_url} != undefined){
                return(
                <td><Link href={`${item.self_intro_url}`}>youtube</Link></td>
              ) else (
                return (
                <td>未登録</td>
              )
            } */}
              {/* http://localhost:3000/show?Unique_id=1　になった */}
              <td><Link href={`/edit?Unique_id=${item.VtuberId}`}>編集</Link></td>
              {/* <td><Link href={`/posts/${item.streamer_id}`}>編集</Link></td> */}
              {/* <DeleteButton Unique_id={item.streamer_id} /> */}
            </tr>
            ))}
        </tbody>
      </table><br />
      </div>

)};

export default AllDatePage;