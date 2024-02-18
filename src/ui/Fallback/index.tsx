import Loader from '@src/ui/Loader';

function Fallback() {
  return (
    <div className="fallback-wrapper">
      <Loader />
      <p>Идет загрузка данных...</p>
    </div>
  );
}

export default Fallback;
