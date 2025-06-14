import main from "../components/lg.png";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 h-full w-full">
      <div className="max-w-md text-center space-y-6 p-12">
        <div className="flex justify-center">
          <img src={main} alt="LG Logo" className="w-48 h-auto" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-base-content/70 text-lg leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
