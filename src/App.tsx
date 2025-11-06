import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { Tab } from './types/Tab';
import React from 'react';
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';

const tabs: Tab[] = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

const Navbar: React.FC = () => {
  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="Nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames('navbar-item', { 'is-active': isActive })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tabs"
            className={({ isActive }) =>
              classNames('navbar-item', { 'is-active': isActive })
            }
          >
            Tabs
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Home page</h1>
      </div>
    </div>
  );
};

const TabsPage: React.FC = () => {
  const { tabId } = useParams<{ tabId?: string }>();
  const activeTab = tabs.find(tab => tab.id === tabId);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Tabs page</h1>

        <div className="tabs is-boxed">
          <ul>
            {tabs.map(tab => {
              const isActive = tab.id === tabId;

              return (
                <li
                  key={tab.id}
                  data-cy="Tab"
                  className={classNames({ 'is-active': isActive })}
                >
                  <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="block" data-cy="TabContent">
          {!tabId || !activeTab ? 'Please select a tab' : activeTab.content}
        </div>
      </div>
    </div>
  );
};

const NotFoundPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Page not found</h1>
      </div>
    </div>
  );
};

export const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to={'/'} replace />} />
      <Route path="/tabs">
        <Route index element={<TabsPage />} />
        <Route path=":tabId" element={<TabsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);
