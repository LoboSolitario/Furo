<div id="top"></div>
<br />
<div align="center">
  <a href="http://furo.capital">
    <img src="static/images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Furo Capital</h3>

  <p align="center">
    Furo is an investment platform that offers customised baskets built for long-term wealth creation and portfolio building. We aim to make investing in crypto better and simple.
    <br />
    <a href="https://tejasv-sharma.gitbook.io/litepaper"><strong>Explore the Litepaper »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/Bv8TV8OtKFI">View Demo</a>
    ·
    <a href="https://github.com/LoboSolitario/Furo/issues">Report Bug</a>
    ·
    <a href="https://github.com/LoboSolitario/Furo/issues">Request Feature</a>
  </p>
</div>

[![Product Name Screen Shot][product-screenshot]](http://furo.capital)



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#inspiration">Inspiration</a></li>
    <li><a href="#team-motto">Team Motto</a></li>
    <li><a href="#what-it-does-">What it does?</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#running-the-webserver">Running the webserver</a></li>
      </ul>
    </li>
    <li><a href="#license">How we built it?</a></li>
    <li><a href="#challenges-we-ran-into">Challenges we ran into</a></li>
    <li><a href="#accomplishments-that-we-are-proud-of">Accomplishments that we are proud of</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#get-in-touch">Get in touch</a></li>
    <li><a href="#acknowledgments">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Inspiration
The DeFi space is growing astronomically. We won't be wrong if we call it the front page of crypto. It's the juicy APR's, high yields, airdrops, and gigantic returns that attract people. And this greed/hunger is fulfilled by highly sophisticated investment products like vaults, liquidity pools, yield farms, etc. These products serve as an excellent tool for people who have experience in crypto/trading and know the underlying risks like impermanent loss/liquidation.

We realized that no investment products are made for people who want slightly less risk or want to invest passively. We believe the next billion on crypto will be onboarded from traditional finance platforms like Revolut, Robinhood, Zerodha, etc. Their first instinct will be to look for an ETF product that gives them one-click exposure to the top ecosystems in the crypto space. We were shocked when we realized that there was no such product except for Indexcoop, which gives you very specific thematic exposure.

We decided to solve this problem and started building FURO capital. It is an investment platform that offers customized baskets for the crypto space. The basket ranges from simple market-weighted crypto baskets to quant-managed thematic baskets. The current process of investing in crypto has a very high barrier to entry. A user might have to create multiple wallets and use multiple exchanges to place orders. We also address this problem by seamlessly integrating with exchanges like the mango market and Binance/FTX.

<p align="right">(<a href="#top">back to top</a>)</p>




## Team Motto
Our team believes that an MVP is a process that you repeat over and over again: Identify your riskiest assumption, find the smallest possible experiment to test that assumption, and use the results of the experiment to course correct.

So our focus is to perfect and dominate one function in the beginning that we are really good at solving and keeping the product simple. Once we achieve that, then we reiterate and add layers of complexities as our product matures. This will allow us to understand the market dynamics and the user emotions and help us build our product that actually solves a problem in society and have a meaningful impact.

<p align="right">(<a href="#top">back to top</a>)</p>




## What it does?

Furo offers tailor-made crypto baskets to users according to their risk appetite. The baskets are weighted so that the risk is diversified across different bets. We also have a neat feature that empowers retailers by helping them catch the dip. Furo also allows the investment manager to create their own baskets and share them across their clientele.

<p align="right">(<a href="#top">back to top</a>)</p>




## How we built it?

Our main focus was to cater for the needs of the new crypto investors. Hence, we thoroughly planned out the design to make it extremely simple and welcoming for them. We believe in simplicity because everyone's life is already complex and we want to reduce the complexity rather than overwhelm them. This can be seen in our clean UI as well as our pitch video.

<p align="right">(<a href="#top">back to top</a>)</p>

**Tech stack:**
1. Backend: Flask, Werkzeug, Jinja, asyncio, Python,
2. Frontend: HTML, CSS, JavaScript, sass, Google material UI
3. Miscellaneous: Mango, Pyth python client, Wormhole, Javascript SDK

<p align="right">(<a href="#top">back to top</a>)</p>




## Getting Started

In order to run the website locally on your computer, follow the steps below. Currently, we use **Python 3.9.7** to develop our product.

### Prerequisites

* Start by installing the `python3-venv` package, which will install the venv module:
    ```sh
    sudo apt install python3-venv
    ```
* Clone the repository to your local machine and change directory to `Furo/`.
    
    ```sh
    git clone https://github.com/LoboSolitario/Furo.git
    cd Furo
    ```
* Create a new virtual environment `furo-env` and activate it.
    ```sh
    python -m venv furo-env
    source myprojectenv/bin/activate
    ```
* Now install all the dependencies from `requirements.txt` file.
    ```sh
    pip install -r requirements.txt
    ```

### Running the webserver

* To start the flask app:

```sh
python app.py
```

* To start the python script to fetch live price feed from pyth:
```sh
python get_pyth_data.py
```

<p align="right">(<a href="#top">back to top</a>)</p>




## Challenges we ran into.
*  With flask being synchronous in nature, we really struggled in using the async pyth python client. However, for now, we figured out a temporary solution to build our MVP.
* Since our team did not have experience with front-end technologies and at the same time we did not find a front-end engineer on short notice to join our team, we had to spend a lot of time developing a user-friendly and comfortable user experience on our platform.
* With limited experience with wormhole, we ran into multiple issues while building a token bridge for your platform. However, we are devoting our nights to figure it out. 
* It was challenging to think from the perspective of a new investor coming to the world of crypto investment and figure out how to make their first experience extremely smooth.

<p align="right">(<a href="#top">back to top</a>)</p>




## Accomplishments that we're proud of
When we were starting to build the project, we were just two people, with a big idea, and an even bigger hunger to do something for our peers. Through our personal experience in both Switzerland, a crypto haven, and India, an unregulated crypto market, we could see the huge need for a simple but effective solution to crypto investing. At this point, we had a problem in our hands, and we planned out a solution to it. However, we only had 10 days and a team of 2 people to pull this off. The odds were against us but was not enough to deter us from our vision. We split the project into two parts based on our expertise. First, the portfolio construction and research analysis which was handled by Tejasv Sharma (Senior research analyst at Windmill Capital) and second,  the product technology development, which was handled by Shouvik Ghosh (Software engineer at CERN, Switzerland).
We are really proud that we are able to showcase our idea with a working demo. 

<p align="right">(<a href="#top">back to top</a>)</p>




## What's next for FURO?

We have divided our vision into five stages.

**Stage 1:**
In stage 1, we plan to tokenize our baskets. The idea behind this is to make these baskets accessible across different chains via Wormhole.

**Stage 2:**
In Stage 2, we will continue to expand our execution pipelines by integrating with major exchanges. For this stage, we plan to go live with the mango market mainnet.

**Stage 3:**
In stage 3, we plan to expand our supported exchange network by integrating with major centralized exchanges like Binance and FTX.

**Stage 4:**
In stage 4, we will be building our investment manager platform. We will be building multiple execution pipelines for the managers.

**Stage 5:**
Go live on the mainnet.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Get in touch

Shouvik Ghosh - [@\_shouvikghosh\_](https://twitter.com/_shouvikghosh_) - 01.shouvik@gmail.com

Tejasv Sharma - [@@TejasvSharma14](https://twitter.com/TejasvSharma14) - replytejasvsharma@gmail.com 

Project Link: [furo.capital](http://furo.capital)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Html5up](https://html5up.net/)
* [Serum](https://www.projectserum.com/)
* [Wormhole](https://wormholenetwork.com/)
* [Pyth](https://pyth.network/)
* [Convergence - Serum and Wormhole Hackathon](https://serum-wormhole-hackathon.devpost.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-url]: https://www.linkedin.com/in/shouvik-ghosh/
[product-screenshot]: static/images/furocapital.png