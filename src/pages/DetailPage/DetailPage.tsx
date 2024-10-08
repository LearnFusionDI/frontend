import React from 'react'

import './detail-page.css'
import Navbar from '../../components/Navbar/Navbar'
import coarseImage from "../../images/coarseImage.png";
import Footer from '../../components/Footer/Footer';

const DetailPage:React.FC = () => {
  return (
    <div className="details">
      <Navbar />
      <header
        className="detail-hero container"
        style={{
          backgroundImage: `url(${coarseImage})`,
          backgroundSize: "cover",
        }}
      ></header>
      <section className="container">
        <div className="title-section">
          <h4>
            Thi is the title section Thi is the title section Thi is the title
            section
          </h4>
          <div className='button-section'>
            <button>View On site</button>
          </div>
        </div>
        <hr />
        <div className="content">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, est
            odit quos ea eligendi accusantium assumenda aliquid architecto eius
            consectetur veritatis dolores? Harum quidem, excepturi incidunt,
            quaerat earum amet temporibus expedita qui maiores nobis eos
            corrupti iste consequatur sit reiciendis laudantium perferendis
            accusamus quod a? Aspernatur dignissimos accusantium repudiandae,
            amet mollitia blanditiis culpa expedita perspiciatis corporis sit
            voluptatem veritatis laudantium quibusdam ea aliquam beatae, quae
            fugit natus corrupti ad dicta quidem placeat sunt soluta. Esse
            maiores dolorum quo eos itaque repudiandae optio exercitationem ab,
            modi eius delectus, sed impedit expedita et magnam minima! Ullam ab
            fuga, nulla perspiciatis alias modi?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, est
            odit quos ea eligendi accusantium assumenda aliquid architecto eius
            consectetur veritatis dolores? Harum quidem, excepturi incidunt,
            quaerat earum amet temporibus expedita qui maiores nobis eos
            corrupti iste consequatur sit reiciendis laudantium perferendis
            accusamus quod a? Aspernatur dignissimos accusantium repudiandae,
            amet mollitia blanditiis culpa expedita perspiciatis corporis sit
            voluptatem veritatis laudantium quibusdam ea aliquam beatae, quae
            fugit natus corrupti ad dicta quidem placeat sunt soluta. Esse
            maiores dolorum quo eos itaque repudiandae optio exercitationem ab,
            modi eius delectus, sed impedit expedita et magnam minima! Ullam ab
            fuga, nulla perspiciatis alias modi?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, est
            odit quos ea eligendi accusantium assumenda aliquid architecto eius
            consectetur veritatis dolores? Harum quidem, excepturi incidunt,
            quaerat earum amet temporibus expedita qui maiores nobis eos
            corrupti iste consequatur sit reiciendis laudantium perferendis
            accusamus quod a? Aspernatur dignissimos accusantium repudiandae,
            amet mollitia blanditiis culpa expedita perspiciatis corporis sit
            voluptatem veritatis laudantium quibusdam ea aliquam beatae, quae
            fugit natus corrupti ad dicta quidem placeat sunt soluta. Esse
            maiores dolorum quo eos itaque repudiandae optio exercitationem ab,
            modi eius delectus, sed impedit expedita et magnam minima! Ullam ab
            fuga, nulla perspiciatis alias modi?
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DetailPage