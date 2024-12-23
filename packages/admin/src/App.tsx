import { Admin, Resource } from 'react-admin';
import { authProvider } from './api/auth';
import { dataProvider } from './api/dataProvider';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './components/auth/LoginPage';
import { ResourceList } from './components/resource/ResourceList';
import { ResourceCreate } from './components/resource/ResourceCreate';
import { ResourceEdit } from './components/resource/ResourceEdit';

// Resource configs
import { trainingsConfig } from './config/resources/trainings';

const resources = [trainingsConfig];

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    layout={AppLayout}
    loginPage={LoginPage}
  >
    {resources.map(config => (
      <Resource
        key={`resource-${config.name}`}
        name={config.name}
        options={{ label: config.label }}
        list={props => <ResourceList {...props} config={config} />}
        create={config.create && (props => <ResourceCreate {...props} config={config} />)}
        edit={config.edit && (props => <ResourceEdit {...props} config={config} />)}
      />
    ))}
  </Admin>
);

export default App;