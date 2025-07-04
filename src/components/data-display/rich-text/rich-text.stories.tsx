import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import RichText from './index';

const meta: Meta<typeof RichText> = {
  component: RichText,
  parameters: {
    controls: { hideNoControlsWarning: true },
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof RichText>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h2>HTML Ipsum Presents</h2>

        <p>
          <strong>Pellentesque habitant morbi tristique</strong> senectus et
          netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
          feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
          sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>{' '}
          Mauris placerat eleifend leo. Quisque sit amet est et sapien
          ullamcorper pharetra. Vestibulum erat wisi, condimentum sed.
        </p>
        <p>
          <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum,
          elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis
          tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis
          pulvinar facilisis. Ut felis.
        </p>

        <h3>Header Level 3</h3>

        <ol>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ol>

        <blockquote>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
            molestie gravida. Curabitur massa. Donec eleifend, libero at
            sagittis mollis, tellus est malesuada tellus, at luctus turpis elit
            sit amet quam. Vivamus pretium ornare est.
          </p>
        </blockquote>

        <h4>Header Level 4</h4>

        <ul>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ul>

        <h5>Header level 5</h5>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Occupation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>25</td>
              <td>developer</td>
            </tr>
            <tr>
              <td>Jane</td>
              <td>24</td>
              <td>designer</td>
            </tr>
            <tr>
              <td>Joe</td>
              <td>23</td>
              <td>teacher</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
};

export const WithH1Tag: Story = {
  args: {
    children: (
      <>
        <h1>HTML Ipsum Presents</h1>
        <p>There can be only one.</p>
      </>
    )
  }
};
