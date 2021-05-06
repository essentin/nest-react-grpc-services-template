import { SiteSettings } from '../../../data/models';

export async function getSiteSettings() {

    let siteSettings = {
        facebookLink: '',
        pinterestLink: '',
        instagramLink: '',
        linkedinLink: ''
    };

    try {
        const siteSettingsData = await SiteSettings.findAll({
            attributes: [
                'name',
                'value'
            ],
            where: {
                type: 'site_settings',
                name: { $in: ['facebookLink', 'pinterestLink', 'instagramLink', 'linkedinLink'] }
            },
            raw: true
        });

        if (siteSettingsData) {
            siteSettingsData.map(data => {
                siteSettings[data['name']] = data['value'];
            });
        }

        return siteSettings;
    } catch (error) {
        return siteSettings;
    }

}