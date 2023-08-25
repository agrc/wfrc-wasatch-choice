import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button } from 'reactstrap';
import config from '../../config';
import { useWindowWidth } from '../../hooks';
import './Sidebar.scss';

export default function Sidebar({ isOpen, toggleSidebar, children }) {
  const windowWidth = useWindowWidth();
  const names = classNames('side-bar side-bar--with-border', {
    'side-bar--hidden': !isOpen,
  });

  return (
    <div id="sideBar" className={names}>
      <PerfectScrollbar className="side-bar__padder">
        {windowWidth <= config.MAX_SMALL_SCREEN_WIDTH && (
          <div>
            <Button close onClick={toggleSidebar} />
          </div>
        )}
        {children}
      </PerfectScrollbar>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
