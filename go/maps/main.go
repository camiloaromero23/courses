package main

import "fmt"

func main() {
	colors := map[string]string{
		"red":   "#ff0000",
		"blue":  "#00ff00",
		"green": "#4bf745",
		"white": "#ffffff",
	}
	// var colors map[string]string
	// colors := make(map[string]string)
	// colors["white"] = "#ffffff"

	delete(colors, "white")
	fmt.Println(colors)
	printMap(colors)
}

func printMap(c map[string]string) {
	for color, hex := range c {
		fmt.Println("Color:", color)
		fmt.Println("Hex:", hex)
	}
}
