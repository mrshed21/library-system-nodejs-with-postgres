const { Genres } = require('../models/models');


exports.getGenres = async () => {

        const allGenres = await Genres.findAll();
        if (allGenres.length === 0) {
            const error = new Error('No genres found');
            error.status = 404;
            throw error;
        }
        return allGenres;

    }

exports.getGenreById = async (id) => {
        const genre = await Genres.findByPk(id);
        if (!genre) {
            const error = new Error('Genre not found');
            error.status = 404;
            throw error;
        }
        return genre;
}


exports.createGenre = async (name) => {
    
    const newGenre = await Genres.findOne({where: {name}});
    if (newGenre) {
        const error = new Error('Genre already exists');
        error.status = 400;
        throw error;
    }
    const genre = await Genres.create({name});
    return genre;
}

exports.updateGenre = async (id , name) => {
   
        const exisitngGenre = await Genres.findByPk(id);
        if (!exisitngGenre) {
            const error = new Error('Genre not found');
            error.status = 404;
            throw error;
        }
        await exisitngGenre.update({ name });
        return exisitngGenre;
}

exports.deleteGenre = async (id) => {
   
        const exisitngGenre = await Genres.findByPk(id);
        if (!exisitngGenre) {
            const error = new Error('Genre not found');
            error.status = 404;
            throw error;
        }
        await exisitngGenre.destroy();
        return exisitngGenre;
}