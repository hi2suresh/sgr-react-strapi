import { useRef } from 'react';
import { useGlobalContext } from './Context';
import sublinks from './data';

const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext();
  const currentPage = sublinks.find((item) => item.pageId === pageId);
  const submenuContainer = useRef(null);
  console.log(currentPage);
  if (!currentPage) return;
  const handleMouseLeave = (event) => {
    const submenu = submenuContainer.current;
    const { left, right, bottom } = submenu.getBoundingClientRect();
    const { clientX, clientY } = event;

    if (clientX < left - 1 || clientX > right - 1 || clientY > bottom - 1) {
      setPageId(null);
    }
  };
  const subMenuStyle = {
    gridTemplateColumns: currentPage.links.length > 3 ? '1fr 1fr' : '1fr',
  };
  return (
    <div
      className={currentPage ? 'submenu show-submenu' : 'submenu'}
      ref={submenuContainer}
      onMouseLeave={handleMouseLeave}
    >
      <h5>{currentPage.page}</h5>
      <div className="submenu-links" style={subMenuStyle}>
        {currentPage.links.map((link) => {
          const { id, icon, label, url } = link;
          return (
            <a href={url} key={id}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default Submenu;
