import Head from "next/head";
const Header = ({ children }) => {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/jpg" href="/ball-2.jpg" />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lobster&family=Roboto:ital,wght@1,300&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="Y7AhEXjqshRz7CKtM7SSoyyQz4-RxXwebjgPIhgKhVU"
        />
        {children}
      </Head>
    </>
  );
};
export default Header;
