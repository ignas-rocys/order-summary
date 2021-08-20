
const Content = ({children, className}) => {
  return (
    <main className={`content ${className}`}>
      {children}
    </main>
  );
};

export default Content;
