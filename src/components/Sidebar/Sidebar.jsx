import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button } from 'reactstrap';
import config from '../../config';
import { useWindowWidth } from '../../hooks';
import './Sidebar.scss';

export default (props) => {
  const windowWidth = useWindowWidth();
  const names = classNames('side-bar side-bar--with-border', {
    'side-bar--hidden': !props.isOpen,
  });

  return (
    <div id="sideBar" className={names}>
      <PerfectScrollbar className="side-bar__padder">
        {windowWidth <= config.MAX_SMALL_SCREEN_WIDTH && (
          <div>
            <Button close onClick={props.toggleSidebar} />
          </div>
        )}
        {props.children}
      </PerfectScrollbar>
    </div>
  );
};
