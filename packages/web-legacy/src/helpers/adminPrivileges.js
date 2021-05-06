const privileges = [
  {
    id: 2,
    privilege: 'Manage Users',
    permittedUrls: ['/siteadmin/users', '/siteadmin/profileView/'],
  },
  {
    id: 3,
    privilege: 'Manage Listings',
    permittedUrls: ['/siteadmin/listings', '/become-a-host/'],
  },
  {
    id: 4,
    privilege: 'Manage Reservations',
    permittedUrls: ['/siteadmin/reservations', '/siteadmin/viewreservation/'],
  },
  {
    id: 14,
    privilege: 'Manage Listing Settings',
    permittedUrls: [
      '/siteadmin/listsettings/1',
      '/siteadmin/listsettings/2',
      '/siteadmin/listsettings/4',
      '/siteadmin/listsettings/5',
      '/siteadmin/listsettings/6',
      '/siteadmin/listsettings/7',
      '/siteadmin/listsettings/8',
      '/siteadmin/listsettings/9',
      '/siteadmin/listsettings/10',
      '/siteadmin/listsettings/11',
      '/siteadmin/listsettings/12',
      '/siteadmin/listsettings/13',
      '/siteadmin/listsettings/14',
      '/siteadmin/listsettings/15',
      '/siteadmin/listsettings/16',
      '/siteadmin/listsettings/18',
      '/siteadmin/listsettings/19',
      '/siteadmin/listsettings/20'
    ],
  },
  {
    id: 15,
    privilege: 'Manage CMS Pages',
    permittedUrls: [
      '/siteadmin/content-management',
      '/siteadmin/page/add',
      '/siteadmin/staticpage/management',
      '/siteadmin/edit/staticpage/',
    ],
  },
  {
    id: 16,
    privilege: 'Manage User Invites',
    permittedUrls: [ '/siteadmin/settings/user-invitation', '/siteadmin/user-invitation' ]
  }
];

export function getAllAdminPrivileges() {
  return privileges;
}

export function getAllAdminPrivilegesId() {
  return privileges.map(item => item.id);
}

export function validatePrivilege(requestId, permittedPrevileges) {
  return (
    permittedPrevileges &&
    permittedPrevileges.length > 0 &&
    permittedPrevileges.indexOf(requestId) >= 0
  );
}

export function restrictUrls(requestURL, permittedPrevileges) {
  let findRequestedUrlId = privileges.find(
    o =>
      o &&
      o.permittedUrls &&
      o.permittedUrls.length > 0 &&
      o.permittedUrls.indexOf(requestURL) >= 0,
  );

  if (findRequestedUrlId) {
    let checkAccess =
      permittedPrevileges &&
      permittedPrevileges.length &&
      permittedPrevileges.indexOf(findRequestedUrlId.id) >= 0;
    if (checkAccess) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
