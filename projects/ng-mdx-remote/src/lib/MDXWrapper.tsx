import React from 'react';
import { MDXProvider } from '@mdx-js/react';

interface MdxWrapperProps {
  Content: React.ComponentType;
  onRendered: () => void;
  reactComponents: { [key: string]: React.ComponentType<any> };
}

const MDXWrapper: React.FC<MdxWrapperProps> = ({ Content, onRendered, reactComponents }) => {
  React.useEffect(() => {
    // Call the function to notify that rendering is complete
    onRendered();
  }, [onRendered]);

  return (
    <MDXProvider components={reactComponents}>
      <Content />
    </MDXProvider>
  );
};

export default MDXWrapper;