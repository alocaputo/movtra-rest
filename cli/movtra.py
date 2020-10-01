#!/usr/bin/env python

import os
import sys
import argparse
import requests
import curses
import time

def menu(stdscr, movie_id):
    k = 0
    cursor_x = 0
    cursor_y = 0

    # Clear and refresh the screen for a blank canvas
    stdscr.clear()
    stdscr.refresh()

    # Start colors in curses
    curses.start_color()
    curses.init_pair(1, curses.COLOR_CYAN, curses.COLOR_BLACK)
    curses.init_pair(2, curses.COLOR_RED, curses.COLOR_BLACK)
    curses.init_pair(3, curses.COLOR_BLACK, curses.COLOR_WHITE)

    # Loop where k is the last character pressed
    while (k != ord('q')):

        # Initialization
        stdscr.clear()
        height, width = stdscr.getmaxyx()

        if k == curses.KEY_DOWN:
            cursor_y = cursor_y + 1
        elif k == curses.KEY_UP:
            cursor_y = cursor_y - 1
        elif k == curses.KEY_RIGHT:
            cursor_x = cursor_x + 1
        elif k == curses.KEY_LEFT:
            cursor_x = cursor_x - 1

        cursor_x = max(0, cursor_x)
        cursor_x = min(width-1, cursor_x)

        cursor_y = max(0, cursor_y)
        cursor_y = min(height-1, cursor_y)

        statusbarstr = "Press 'q' to exit | STATUS BAR | data from The Movie Database (TMDb)".format(cursor_x, cursor_y)

        # Fetch information
        base_url = 'http://127.0.0.1:8000/api'
        request = requests.get(base_url+'/movies/{movie_id}'.format(movie_id=str(movie_id))).json()
        credits = requests.get(base_url+'/movies/{movie_id}/credits'.format(movie_id=str(movie_id))).json()

        max_columns = os.get_terminal_size().columns
        line = max_columns*'-'

        year= request['release_date'][:4] if len(request['release_date'])>= 4 else 'n/a'
        title=request['title']

        directors = ''
        for person in credits['crew']:
            if person['job'] == 'Director':
                directors+=person['name']
                directors+=', '


        top = "{title} ({year})".format(title=title,year=year)
        overview = request['overview']
        
        # Centering calculations
        start_x_top = int((width // 2) - (len(top) // 2) - len(top) % 2)
        start_x_overview = int((width // 2) - (len(overview) // 2) - len(overview) % 2)
        start_y = int((height // 2) - 2)

        # Render status bar
        stdscr.attron(curses.color_pair(3))
        stdscr.addstr(height-1, 0, statusbarstr)
        stdscr.addstr(height-1, len(statusbarstr), " " * (width - len(statusbarstr) - 1))
        stdscr.attroff(curses.color_pair(3))

        # Turning on attributes for title
        stdscr.attron(curses.color_pair(2))
        stdscr.attron(curses.A_BOLD)

        # Rendering title
        stdscr.addstr(start_y, start_x_top, top)

        # Turning off attributes for title
        stdscr.attroff(curses.color_pair(2))
        stdscr.attroff(curses.A_BOLD)

        # Print rest of text
        stdscr.addstr(start_y + 1, 0, '-' * width)
        stdscr.addstr(start_y + 2, 0, 'Directed by: {}'.format(directors[:-2]))
        stdscr.addstr(start_y + 3, 0, '-' * width)
        stdscr.addstr(start_y + 4, 0, overview)
        stdscr.move(cursor_y, cursor_x)

        # Refresh the screen
        stdscr.refresh()

        # Wait for next input
        k = stdscr.getch()

if len(sys.argv) == 1:
    print('You have specified too many arguments')
    sys.exit()

if len(sys.argv) < 2:
    print('You need to specify the path to be listed')
    sys.exit()

def parse_args():
    parser = argparse.ArgumentParser(description="movtra args")
    parser.add_argument(
        "-i",
        "--id",
        metavar="id",
        default=None,
        type=int
    )

    opt = parser.parse_args()
    return opt

def main():
    opt = parse_args()
    if opt.id:
        movie_id = opt.id
        curses.wrapper(menu, movie_id)

main()
