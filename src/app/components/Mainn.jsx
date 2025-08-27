"use client";
import { useEffect, useState } from "react";
import { getMusica } from "../services/musicService.js";

export default function Main({ searchTerm }) {
    const [musica, setMusica] = useState({ tracks: [], artists: [] });
    const [filteredMusica, setFilteredMusica] = useState({ tracks: [], artists: [] });
    const [currentTrack, setCurrentTrack] = useState();
    const [audio, setAudio] = useState();
    const [isPlayingMusica, setIsPlayingMusica] = useState(false);
    
    useEffect(() => {
        const fetchMusica = async () => {
            try {
                const music = await getMusica();
                setMusica(music);
                setFilteredMusica(music);
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchMusica();
    }, []);

    useEffect(() => {
        if (!searchTerm || searchTerm.trim() === "") {
            setFilteredMusica(musica);
        } else {
            const searchLower = searchTerm.toLowerCase();
            const filteredTracks = musica.tracks.filter(track =>
                track.name.toLowerCase().includes(searchLower) ||
                track.album.artists[0].name.toLowerCase().includes(searchLower) ||
                track.album.name.toLowerCase().includes(searchLower)
            );
            const filteredArtists = musica.artists.filter(artist =>
                artist.name.toLowerCase().includes(searchLower)
            );
            setFilteredMusica({ tracks: filteredTracks, artists: filteredArtists });
        }
    }, [searchTerm, musica]);

    const playTrack = (track) => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        const newAudio = new Audio(track.preview_url);
        setAudio(newAudio);
        setCurrentTrack(track);
        newAudio.play().then(() => {
            setIsPlayingMusica(true);
        }).catch(error => {
            console.error("Error reproduciendo:", error);
            alert("No se puede reproducir esta cancion:");
        });
        newAudio.onended = () => {
            setIsPlayingMusica(false);
            setCurrentTrack();
        };
    };
    const stopMusica = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlayingMusica(false);
            setCurrentTrack();
        }
    };

    return (
        <div className="w-3/4 h-full overflow-y-auto scroll-area bg-neutral-950 rounded-xl scrollbar-hidden scrollbar-hover scrollbar-transparent">
            <section className="flex flex-col gap-4 p-4">
                <h1 className="text-2xl text-white font-bold mb-4">
                    Canciones del momento
                </h1>
                <div className="flex flex-row items-start justify-start text-start w-[200%]">
                    {filteredMusica.tracks.map((track, index) => (
                        <div key={index} className="flex flex-col p-2 w-48">
                            <div className="bg-neutral-700 rounded-md w-40 h-40">
                                <div className="relative">
                                    <img
                                        src={track.album.images[0]?.url}
                                        alt={track.name}
                                        className="w-full rounded h-full object-cover"
                                    />
                                    <button
                                        className={`absolute top-26 right-2 rounded-full w-12 h-12 cursor-pointer bg-green-500 hover:bg-green-400`}
                                        onClick={() => {
                                            if (currentTrack?.id === track.id && isPlayingMusica) {
                                                stopMusica();
                                            } else {
                                                playTrack(track);
                                            }
                                        }}
                                    >
                                        <img src="/play.svg" alt="play" width={18} height={18} className="absolute bottom-4 left-4" />
                                    </button>
                                </div>
                            </div>
                            <h2 className="font-medium text-lg text-white font-bold py-2">{track.name}</h2>
                            <h5 className="text-neutral-400 font-medium text-sm">{track.album.artists[0].name}</h5>
                            {track.preview_url && (
                                <audio
                                    src={track.preview_url}
                                    controls
                                    className="hidden"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex flex-col p-4">
                <h1 className="text-2xl text-white font-bold mb-4">
                    Artistas
                </h1>
                <div className="flex flex-row items-start justify-start text-start w-[200%] gap-2">
                    {filteredMusica.artists.map((artist, index) => (
                        <div key={index} className="flex flex-col p-2 w-48">
                            <div className="rounded-full w-40 h-40 mb-2">
                                <img
                                    src={artist.images[0]?.url}
                                    alt={artist.name}
                                    className="cursor-pointer rounded-full w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="font-medium text-lg py-2 text-white font-bold">{artist.name}</h2>
                            <h5 className="text-neutral-400 font-medium text-md">Artista</h5>
                        </div>
                    ))}
                </div>
            </section>
            {currentTrack && (
                <div className="fixed bottom-0 left-0 right-0 bg-black p-4 z-10">
                    <div className="flex items-center justify-start max-w-screen-xl mx-auto">
                        <div className="flex items-center space-x-4">
                            <img
                                src={currentTrack.album.images[0]?.url}
                                alt={currentTrack.name}
                                className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                                <p className="font-medium text-lg text-white font-bold">{currentTrack.name}</p>
                                <p className="text-neutral-400 font-medium text-sm">{currentTrack.album.artists[0].name}</p>
                                
                            </div>
                            <button>
                                    <img src="/add.svg" alt="añadir" className="filter invert-[10]"  width={20} height={20}/>
                                </button>
                        </div>

                        <div className="relative flex items-center space-x-4">
                            <button
                                onClick={stopMusica}
                                className="absolute left-125 bg-green-500 text-black rounded-full w-12 h-12 flex items-center justify-center "
                            >
                                <img src="/play.svg" alt="playin" width={18} height={18} className="absolute absolute bottom-4 left-4" />
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}