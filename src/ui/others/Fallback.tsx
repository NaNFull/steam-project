import Loader from '@src/ui/others/Loader';

function Fallback() {
  return (
    <div className="fallback-wrapper">
      <Loader />
      <p>Идет загрузка данных...</p>
    </div>
  );
}

export default Fallback;
