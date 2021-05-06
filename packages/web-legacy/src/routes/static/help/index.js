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

  path: '/support',

  async action({ store, locale }) {
    const dataResult = await new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./help.md'));
      }, 'help');
    });

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: { id: 5 },
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();

    if (data && data.getEditStaticPage) {

      return {
        title: data.getEditStaticPage.metaTitle,
        description: data.getEditStaticPage.metaDescription,
        chunk: 'help',
        component: renderComponent(store.getState().account, <Page html={data.getEditStaticPage.content} title={data.getEditStaticPage.metaTitle} />)
      };

    } else {

      return {
        title: dataResult.title,
        chunk: 'help',
        component: renderComponent(store.getState().account, <Page {...dataResult} />)
      };

    }

  },

};
