export default function audio(src: string) {
    const audio = new Audio(src);
    audio.currentTime = 0;
    audio.play()
}
