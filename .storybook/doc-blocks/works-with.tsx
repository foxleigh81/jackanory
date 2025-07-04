import React from 'react';
import { useOf } from '@storybook/addon-docs/blocks';

import Badge from './badge';

/**
 * The WorksWith DocBlock displays a badge that shows that the current component
 * is designed to interact with another component. The badge will link to the
 * other component's first story.
 *
 * Only the components listed in the `getComponent` switch will be allowed,
 * any other component will throw an error.
 */

type Props = {
  badgeOnly?: boolean;
};

// Render component
export const WorksWith: React.FC<Props> = ({ badgeOnly }: Props) => {
  const metaOf = useOf('meta') as any;
  const meta = metaOf.csfFile.meta;
  const { parameters } = meta;

  if (!parameters.worksWith) return null;

  const getComponent = (component) => {
    if (!component) throw new Error('You must provide a component');
    switch (component.toLowerCase()) {
      case 'cards':
      case 'card':
        return {
          name: 'Card',
          link: `/?path=/docs/components-layout-card--docs#compatibility`,
          colour: '#6699cc',
          message:
            'You can use the CardHeader and CardBody components as direct children'
        };
      case 'inputfactory':
      case 'input-factory':
        return {
          name: 'InputFactory',
          link: `/?path=/docs/components-factories-input-factory--docs#compatibility`,
          colour: '#663399'
        };
      case 'tablefactory':
      case 'table-factory':
        return {
          name: 'TableFactory',
          link: `/?path=/docs/components-factories-table-factory--docs#compatibility`,
          colour: '#00a126'
        };
      default:
        throw new Error(`${component} is not a valid component name`);
    }
  };

  const { name, link, colour, message } = getComponent(parameters.worksWith);

  return (
    <>
      <Badge colour={colour} link={link}>
        Works with <strong>{name}</strong>
      </Badge>
      {!badgeOnly && (
        <p>
          This component works with the <a href={link}>{name}</a> component.{' '}
          {message
            ? message
            : 'It is strongly recommended that you use it as it will ensure that the component is accessible and consistent with the rest of the application'}
        </p>
      )}
    </>
  );
};

export default WorksWith;
