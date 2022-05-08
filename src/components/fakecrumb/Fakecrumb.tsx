import React from 'react';
import { Link } from 'react-router-dom';

type CrumbItem = {
  title: string;
  link: string;
}

type FakecrumbProps = {
  fakeItems?: string | string[];
  items?: CrumbItem | CrumbItem[];
  currentItem: string;
}

const Fakecrumb: React.FC<FakecrumbProps> = ({fakeItems, items, currentItem}) => {
  const fakeCrumbItems = CreateFakeCrumbItems(fakeItems);
  const crumbItems = CreateCrumbItems(items);
  const currentCrumb = CreateCurrentCrumb(currentItem);

  return (
    <div className="d-flex flex-wrap">
      <nav className="py-2 px-3 rounded-2 mt-3 me-0 me-sm-3" aria-label="breadcrumb" style={{ background: '#E9ECEF' }}>
        <ol className="breadcrumb m-0">
          {fakeCrumbItems}
          {crumbItems}
          {currentCrumb}
        </ol>
      </nav>
    </div>
  );
};

const CreateFakeCrumbItems = (fakeItems: string | string[] | undefined) => {
  const CreateFakeCrumb = (title: string) => {
    return <li className="breadcrumb-item text-secondary brdlink">{title}</li>
  }

  let fakeCrumbs: React.ReactNode[] = [];

  if (fakeItems) {
    const fakeCrumbItems = Array.isArray(fakeItems) ? fakeItems : [fakeItems];
    fakeCrumbs.push(fakeCrumbItems.map(i => CreateFakeCrumb(i)));
  }

  return fakeCrumbs;
}

const CreateCrumbItems = (items: CrumbItem | CrumbItem[] | undefined) => {
  const CreateCrumb = (item: CrumbItem) => {
    return (
      <li className="breadcrumb-item text-secondary brdlink">
        <Link to={item.link} style={{
          color: 'black'
        }}>
          {item.title}
        </Link>
      </li>
    )
  }

  let crumbs: React.ReactNode[] = [];

  if (items) {
    const crumbItems = Array.isArray(items) ? items : [items];
    crumbs.push(crumbItems.map(i => CreateCrumb(i)));
  }

  return crumbs;
}

const CreateCurrentCrumb = (currentItem: string) => {
  return (
    <li className="breadcrumb-item active text-primary" aria-current="page">
      {currentItem}
    </li>
  )
}

export default Fakecrumb;
