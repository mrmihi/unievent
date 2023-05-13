import AllResources from './AllResources';
import { useEffect, useState } from 'react';
import resourceService from '../resources.service';

function AllResourcesView() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    resourceService.getAll().then((response) => setResources(response));
  }, []);

  return (
    <>
      <AllResources resources={resources} />
    </>
  );
}

export default AllResourcesView;
