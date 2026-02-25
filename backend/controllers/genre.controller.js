const genreService = require('../services/genre.service');



// get all genres
exports.getGenres = async (req ,res ,next ) => {
    try {
        const genres = await genreService.getGenres();
        res.json({
            success: true,
            message: 'Genres fetched successfully',
            data: genres
        });
    } catch (error) {
        next(error);
    }
}

exports.getGenreById = async (req , res , next) => {
    try {
        const { id } = req.params;
        const genre = await genreService.getGenreById(id);
        res.json({
            success: true,
            message: 'Genre fetched successfully',
            data: genre
        });

    } catch (error) {
        next(error);
    }
}

exports.createGenre = async (req, res , next) => {
    const { name } = req.body;
    try {
        const newGenre = await genreService.createGenre(name);
        res.status(201).json({
            success: true,
            message: 'Genre created successfully',
            data: newGenre
        });
    } catch (error) {
        console.error('Error creating genre:', error);
    next(error);
    }

}

exports.updateGenre = async (req, res , next) => {
    const { id} = req.params;
    try {
        const updatedGenre = await genreService.updateGenre(id, req.body.name);
        res.json({
            success: true,
            message: 'Genre updated successfully',
            data: updatedGenre
        });


    } catch (error) {
        console.error('Error updating genre:', error);
        next(error);
        
    }
}

exports.deleteGenre = async (req, res , next) => {
    try {
    const { id } = req.params;
    const deletedGenre = await genreService.deleteGenre(id);
    res.json({
        success: true,
        message: 'Genre deleted successfully',
        data: deletedGenre
    });
    } catch (error) {
        console.error('Error deleting genre:', error);
        next(error);
    }
}
