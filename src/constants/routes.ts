type Routes = {
  auth: {
    root: string,
    welcome: string,
    importAccount: string,
  }

  main: {
    root: string,
    switchRole: string,

    creator: {
      lock: string,
      engage: string,
      claim: string,
    },
    follower: {
      lock: string,
      engage: string,
      claim: string,
    },
    importAccount: string,
    addNetwork: string,
  }
};

export const ROUTES: Routes = {
  auth: {
    root: 'loading',
    welcome: 'welcome',
    importAccount: 'import-account',
  },

  main: {
    root: 'main',
    switchRole: 'switch-role',

    creator: {
      lock: '/main/creator/lock',
      engage: '/main/creator/engage',
      claim: '/main/creator/claim',
    },

    follower: {
      lock: '/main/follower/lock',
      engage: '/main/follower/engage',
      claim: '/main/follower/claim',
    },

    importAccount: '/main/import-account',
    addNetwork: '/main/add-network',
  },
};
