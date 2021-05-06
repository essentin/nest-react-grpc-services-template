import React from 'react';
import Page from '../../../components/Page';
import fetch from '../../../core/fetch';
import { renderComponent } from '../../../helpers/userTypeHelper';

const query = `query getEditStaticPage ($id: Int!) {
  getEditStaticPage (id: $id) {
      id
      pageName
      content
      metaTitle
      metaDescription
      createdAt
  }
}`;

export default {

  path: '/safety',

  async action({ store, locale }) {
    const dataResult = await new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./trustAndSafety.md'));
      }, 'trustAndSafety');
    });
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: { id: 2 },
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.getEditStaticPage) {
      return {
        title: 'Trust & Safety',
        description: data.getEditStaticPage.metaDescription,
        chunk: 'about',
        component: renderComponent(store.getState().account, <Page
          html={data.getEditStaticPage.content}
          title={data.getEditStaticPage.pageName}
        />)
      };

    } else {
      return {
        title: dataResult.title,
        chunk: 'trustAndSafety',
        component: renderComponent(store.getState().account, <Page {...dataResult} />)
      };
    }
  },

};