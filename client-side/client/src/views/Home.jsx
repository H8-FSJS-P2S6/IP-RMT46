import ImageHome from "../components/ImageHome";
import PrayerTime from "../components/PrayerTime";
import TextHome from "../components/TextHome";


export default function Home() {
    const bgStyle = {
        backgroundColor: 'lightblue',
        backgroundImage: 'url(/bg1.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        height: '100% !important',
    }

    return (
        <>
            {/* <div style={bgStyle} className="container-fluid d-flex"> */}
                <div className="container" style={{ marginTop: '15%' }}>
                    <div className="row" style={{ margin: '3%' }}>
                        <ImageHome />
                        <div className="col-md-6 small-font-size " >
                            <TextHome />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <blockquote className="blockquote">
                                <PrayerTime />
                            </blockquote>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}