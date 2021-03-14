

const dashboardRoutes = {
    getArtists(name) {
        return 'https://dev-assignment.ew.r.appspot.com/search?q=' + name + '&limit=20&offset=0';
    }
};

export {
    dashboardRoutes
};