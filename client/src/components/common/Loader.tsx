import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center w-full items-center">
      {/* <InfinitySpin width="400" color="#a7f3d0" />; */}

      <Oval
        height={200}
        width={200}
        color="#a7f3d0"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
