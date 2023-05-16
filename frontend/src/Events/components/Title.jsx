const Title = ({ title, className, aos }) => {
  return (
    <div
      className={`text-5xl md:text-5xl font-bold text-sky-600 text-center ${className}`}
      data-aos={aos}
    >
      {title}
    </div>
  );
};

export default Title;
