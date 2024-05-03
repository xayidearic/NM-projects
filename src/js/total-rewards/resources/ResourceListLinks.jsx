/** @typedef {import('./DynamicResourceSection').ResourceLink}  ResourceLink */

/**
 * Renders a list of resource links/documents for the UI
 * backend - allow authors to list a max of 3
 * @param {{ hasResources: boolean, resourceLinks: ResourceLink[] }} props
 */
const ResourceListLinks = ({ hasResources, resourceLinks }) => {
  const linkedItemsContent = resourceLinks?.map((item) => {
    return (
      <div className="d-flex align-items-center" key={btoa(`resource-${item.CurrentLink.Text}`)}>
        <img src={item.IconUrl}
          alt="" />
        <a href={item.Uri}
          className="mb-0 ms-4"
          target={item.CurrentLink.Target}
          title={item.CurrentLink.Title}>
          {item.CurrentLink.Text}
        </a>
      </div>
    );
  });

  return (
    hasResources && (
      <div className="total-rewards-resource__list float-lg-end col-12 col-lg-4 ms-lg-6">
        <h4 className="mt-0 color-primary mt-6 mt-lg-0">Resources</h4>
        <div>{linkedItemsContent}</div>
      </div>
    )
  );
};

export default ResourceListLinks;
