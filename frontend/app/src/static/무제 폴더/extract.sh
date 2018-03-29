for file in ../video/*.mp4; do 
	mkdir "${file%.*}"
	ffmpeg -i "$file" -f image2 -vsync vfr -vf "[in]select='eq(pict_type,PICT_TYPE_I)',showinfo[out]" "${file%.*}"/thumb%04d.png 2> "$file"_positions.txt
done
