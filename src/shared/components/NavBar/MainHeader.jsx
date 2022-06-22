import './MainHeader.styles.scss';

const MainHeader = ({ children }) => {
  return (
    <>
    <header className='main-header'>
      {children}
    </header>
    <main />
    </>
  );
};

export default MainHeader;
